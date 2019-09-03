<script>
  export let credits
  let visible = false
</script>

<style>
  aside {
    color: white;
    background: black;
    white-space: pre-line;

    padding:0 var(--gutter);
    max-height: 0vh;
    overflow: auto;

    transition: max-height 666ms, padding 666ms;
  }
  
  aside.visible {
    padding: calc(var(--rythm)*3) var(--gutter);
    max-height: 66vh;
  }

  button {
    padding: 0;
    margin: calc(var(--rythm)*1.5) 0;
  }
</style>


<button on:click={() => visible = !visible}>Full Credit List {#if visible}↑{:else}↓{/if}</button>

<aside class:visible>
  {credits}
</aside>