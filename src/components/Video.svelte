<script>
  export let poster
  export let srcs
  export let title
  export let full = true
  export let controls = false

  let time = 0
	let duration
  let buffered
	let paused
  let volume = 1
  let fade = false

  let videoElement
  let fadeTimeout

  function format(t) {
    return Math.floor(t / 60) + ":" + ("0" + (t % 60).toFixed()).slice(-2)
  }

  function seek(t) {
    time = t
  }

  function togglePaused() {
    paused = !paused
    if (paused) {
      clearTimeout(fadeTimeout)
      fade = false
    }
  }

  function toggleVolume() {
    volume = volume ? 0 : 1
  }

  function fullscreen() {
    videoElement.requestFullscreen()
  }

  function keydown(e) {
    if (controls && e.key === ' ') {
      e.preventDefault()
      togglePaused()
    }
  }

  function activate() {
    clearTimeout(fadeTimeout)
    fadeTimeout = setTimeout(() => fade = true, 1666)
    fade = false
  }
</script>

<style>
  video {
    width: 100%;
    background: black;
  }

  video.full {
    width: 100vw;
    height: 100vh;
    margin: calc(var(--gutter) * -1) 0 0 calc(var(--gutter) * -1);
  }

  figure {
    position: relative;
    margin: 0;

    color: white;
    cursor: default;
  }

  figure.fade {
    cursor: none;
  }

  figcaption {
    transition: opacity 666ms;
    opacity: 1;
  }

  figure.fade figcaption {
    opacity: 0;
  }

  figcaption.title {
    position: absolute;
    top: calc(var(--gutter) * -0.5);
    left: 0;
  }

  figcaption.title h1 {
    font-size: 12pt;
  }

  figcaption.controls {
    position: absolute;
    left: calc(var(--rythm) / -2);
    bottom: calc(var(--rythm) * 4);
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

    button {
      background: transparent;
      border: none;
      padding: calc(var(--rythm) / 2);
      font-size: 12pt;
    }

    label[for="time"] {
      position: absolute;
      bottom: 36px;
      font-size: 8pt;
      transform: translateX(-50%);
    }

    input[type="range"] {
      position: absolute;
      bottom: 12px;
      left: 0;
      width: 100%;
      margin: 0;

      cursor: col-resize;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background: transparent;
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;

      width: 3px;
      height: 16px;
      background: white;      
    }

    input[type="range"]::-moz-range-thumb {
      -moz-appearance: none;

      width: 3px;
      height: 16px;
      background: white;      
    }

    .buffer {
      position: absolute;
      bottom: 0;

      display: block;
      height: 12px;
      background: white;
    }
</style>

<svelte:window on:keydown={keydown}/>

{#if controls}
<figure class:fade on:mousemove={activate}>
  <figcaption class="title"><h1>{title}</h1></figcaption>

  <video class:full src={srcs ? srcs[0].fields.file.url : undefined} poster={poster.fields.file.url} autoplay
    bind:this={videoElement}
    bind:currentTime={time}
    bind:duration
    bind:buffered
    bind:paused
    bind:volume
    on:play={activate} />
  
  <figcaption class="controls">
    <button on:click={togglePaused}>{#if paused}➞{:else}❚{/if}</button>
    <span>
      <button on:click={fullscreen}>╹</button>
      <button on:click={toggleVolume}>⌑</button>
    </span>
  </figcaption>

  <figcaption class="seeker">
    {#if duration}
    <label for="time" style="left: {time / duration * 100}%">{format(time)} / {format(duration)}</label>
    <input id="time" name="time" type="range" value={time} min={0} step={0.01} max={duration}
      on:input={e => seek(e.currentTarget.value)} />
    {/if}

    {#if buffered}
    {#each buffered as { start, end }}
    <div class="buffer" style="left: {start / duration * 100}%; width: {(end - start) / duration * 100}%;" />
    {/each}
    {/if}
  </figcaption>
</figure>
{:else}
<video class:full src={srcs ? srcs[0].fields.file.url : undefined} poster={poster.fields.file.url} loop muted autoplay />
{/if}