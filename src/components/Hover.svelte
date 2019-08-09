<script>
  import { onMount } from 'svelte'

  export let text = undefined
  export let texts = undefined
  let x
  let y
  let w
  let h
  
  function move(e) {
    x = e.layerX / w
    y = e.layerY / h
  }
</script>

<style>
</style>

<div on:mousemove={move} bind:clientWidth={w} bind:clientHeight={h}>
  {#if texts}
  {#each texts as t, i}
  <!-- <div>
    {#each t as letter, index}
    <span style='font-variation-settings: "wdth" {x 
      ? 900 * ((t.length - Math.abs(index - (x * t.length))) / t.length)
      : 400}, "wght" {y 
      ? 160 * ((texts.length - Math.abs(i - (y * texts.length))) / texts.length)
      : 60}'>{letter}</span>
    {/each}
  </div> -->
  <div style='font-variation-settings: "wdth" {y 
      ? 900 * ((texts.length - Math.abs(i - (y * texts.length))) / texts.length)
      : 400}, "wght" {y 
      ? 160 * ((texts.length - Math.abs(i - (y * texts.length))) / texts.length)
      : 60}'>
    {t}
  </div>
  {/each}
  {:else}
  {#each text as letter, index}
  <span style='font-variation-settings: "wdth" {x 
    ? 700 * ((text.length - Math.abs(index - (x * text.length))) / text.length)
    : 400}'>{letter}</span>
  {/each}
  {/if}
</div>