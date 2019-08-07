<script>
  import { onMount } from 'svelte'


  export let text
  let position = { x: undefined, y: undefined }
  let size = { w: undefined, h: undefined }
  
  function move(e) {
    position.x = e.layerX / size.w
		position.y = e.layerY / size.h
  }
</script>

<style>
  div {
    cursor: col-resize;
  }
</style>

<div on:mousemove={move} bind:clientWidth={size.w} bind:clientHeight={size.h}>
  {#each text as letter, index}
  <span style='font-variation-settings: "wght" {1000 * ((text.length - Math.abs(index - (position.x * text.length))) / text.length)}'>{letter}</span>
  {/each}
</div>