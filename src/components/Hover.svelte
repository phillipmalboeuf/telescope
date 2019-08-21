<script>
  import { onMount } from 'svelte'

  export let text = undefined
  // export let texts = undefined
  let x
  // let y
  let w
  // let h

  let element
  
  function move(e) {
    x = e.layerX / w
    // y = e.layerY / h
  }

  onMount(() => {
    w = element.offsetWidth
    // h = element.offsetHeight
  })

  // function enterColumn(parent, index) {
  //   for (const child of  parent.children) {
  //     child.style = undefined
  //   }
  //   parent.children[index].style = `font-variation-settings: "wdth" 900, "wght" 160`
  //   if (parent.children[index - 1]) {
  //     parent.children[index - 1].style = `font-variation-settings: "wdth" 600, "wght" 100`
  //   } 
  //   if (parent.children[index + 1]) {
  //     parent.children[index + 1].style = `font-variation-settings: "wdth" 600, "wght" 100`
  //   }
  //   if (!parent.children[index - 1]) {
  //     parent.children[index + 1].style = `font-variation-settings: "wdth" 700, "wght" 120`
  //     parent.children[index + 2].style = `font-variation-settings: "wdth" 500, "wght" 80`
  //   }

  //   if (!parent.children[index + 1]) {
  //     parent.children[index - 1].style = `font-variation-settings: "wdth" 700, "wght" 120`
  //     parent.children[index - 2].style = `font-variation-settings: "wdth" 500, "wght" 80`
  //   }
  // }

  // function enterRow(element) {
  //   element.style = `font-variation-settings: "wdth" 200, "wght" 40`
  // }

  // function leaveRow(element) {
  //   element.style = undefined
  //   // for (const child of element.children) {
  //   //   child.style = undefined
  //   // }
  // }
</script>

<style>
  div {
    /* font-variation-settings: "wdth" 200, "wght" 40; */
    /* user-select: none; */
  }

  div > div {
    /* display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    height: 1em; */
  }

  span {
    /* position: relative; */
    /* transition: font-variation-settings 100ms; */
  }

  span:after {
    /* content: attr(data-char); */
    /* position: absolute;
	  left: -0.5em; */
  }
</style>

<div on:mousemove={move} bind:this={element}>
  {#each text as letter, index}
  <span style='font-variation-settings: "wdth" {x 
    ? 900 * ((text.length - Math.abs(index - (x * text.length))) / (text.length))
    : 300}, "wght" {x 
    ? 160 * ((text.length - Math.abs(index - (x * text.length))) / (text.length))
    : 40}'>{letter}</span>
  {/each}
</div>

<!-- <div on:mousemove={move} bind:this={element}>
  {#if texts}
  {#each texts as t, i}
  <div>
    {#each t as letter, index}
    <span data-char={letter} style='font-variation-settings: "wdth" {x 
      ? 600 * ((t.length - Math.abs(index - (x * t.length))) / t.length)
      : 400}, "wght" {y 
      ? 160 * ((texts.length - Math.abs(i - (y * texts.length))) / texts.length)
      : 60}' />
    {/each}
  </div>
  {/each}
  {:else}
  {#each text as letter, index}
  <span style='font-variation-settings: "wdth" {x 
    ? 700 * ((text.length - Math.abs(index - (x * text.length))) / text.length)
    : 400}'>{letter}</span>
  {/each}
  {/if}
</div> -->