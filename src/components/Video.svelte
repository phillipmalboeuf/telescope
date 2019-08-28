<script>
  import { onMount } from 'svelte'

  import Gallery from './Gallery.svelte'

  export let poster
  export let srcs
  export let title = undefined
  export let grabs = undefined

  export let full = true
  export let controls = false
  export let hover = false

  let time = 0
	let duration
  let buffered
	let paused
  let resolution = 0
  let showResolutions = false
  let volume = 1
  let fullscreen = false
  let fade = false

  let element
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

  function selectResolution(index) {
    resolution = index
  }

  function requestToggleFullscreen() {
    if (!fullscreen) {
      element.webkitRequestFullscreen()
    } else {
      document.webkitCancelFullScreen()
    }
  }

  function toggleFullscreen() {
    fullscreen = !fullscreen
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

  function grab(index) {
    seek(grabs[index].fields.time)
  }

  onMount(() => {
    document.addEventListener('webkitfullscreenchange', toggleFullscreen, false)

    return () => document.removeEventListener('webkitfullscreenchange', toggleFullscreen)
  })
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

  figure.fullscreen video.full {
    margin: 0
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

  figure.fullscreen figcaption.title {
    top: calc(var(--gutter));
    left: calc(var(--gutter));
  }

  figcaption.title h1 {
    font-size: 10pt;
  }

  figcaption.controls {
    position: absolute;
    left: calc(var(--rythm) / -2);
    bottom: calc(var(--rythm) * 4);
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  figcaption.controls > span > span {
    display: inline-block;
    max-width: 58pt;
    text-align: right;
  }

  figure.fullscreen figcaption.controls {
    left: 0;
    padding: 0 var(--gutter);
  }

  figure.fullscreen figcaption.seeker {
    padding: 0 var(--gutter);
  }

    button {
      padding: calc(var(--rythm) / 2);
      font-size: 10pt;
    }

    button.faded {
      opacity: 0.666;
    }

    label[for="time"] {
      position: absolute;
      bottom: 36px;
      font-size: 10pt;
      transform: translateX(-50%);
    }

    figure.fullscreen input[type="range"] {
      bottom: 30px;
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
    }

    figure.fullscreen input[type="range"] {
      bottom: 6px;
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

    figure.fullscreen .buffer {
      bottom: -6px;
    }
</style>

<svelte:window on:keydown={keydown} />

{#if controls}
<figure class:fade class:fullscreen on:mousemove={activate} bind:this={element}>
  <figcaption class="title"><h1>{title}</h1></figcaption>

  <video class:full src={srcs ? srcs[resolution].fields.file.url : undefined} poster={poster.fields.file.url} autoplay
    bind:currentTime={time}
    bind:duration
    bind:buffered
    bind:paused
    bind:volume
    on:play={activate} />
  
  <figcaption class="controls">
    <button on:click={togglePaused}>{#if paused}➞{:else}❚{/if}</button>
    <span>
      <span on:mouseenter={() => showResolutions = true} on:mouseleave={() => showResolutions = false}>
        {#if showResolutions}
        {#each srcs as src, index}
        <button class:faded={resolution !== index} on:click={() => selectResolution(index)}>{src.fields.description}</button>   
        {/each}
        {:else}
        <button>{srcs[resolution].fields.description}</button>  
        {/if}
      </span>
      <button on:click={requestToggleFullscreen}>{#if fullscreen}╻{:else}╹{/if}</button>
      <button on:click={toggleVolume}>{#if volume}⌑{:else}⊠{/if}</button>
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

{#if grabs}
  <Gallery images={grabs.map(grab => ({ thumbnail: grab.fields.thumbnail }))} on:pick={event => grab(event.detail)} />
{/if}
{:else if hover}
<video class:full src={srcs ? srcs[resolution].fields.file.url : undefined} poster={poster.fields.file.url} loop muted
  on:mouseenter={e => e.currentTarget.play()}
  on:mouseleave={e => e.currentTarget.pause()} />
{:else}
<video class:full src={srcs ? srcs[resolution].fields.file.url : undefined} poster={poster.fields.file.url} loop muted autoplay />
{/if}