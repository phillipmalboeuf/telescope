<script>
  import { onMount, tick } from 'svelte'

  export let src
  export let scrollY
  export let windowHeight

  function onScroll(node, [y, height]) {

    return {
      update([y, height]) {
        if (y + height > node.offsetParent.offsetParent.offsetTop && y < node.offsetParent.offsetParent.offsetTop + node.offsetParent.offsetParent.offsetHeight) {
          node.play()
        } else {
          node.pause()
        }
      }
    }
  }
</script>

<style>
  video {
    width: 100%;
    background: black;
  }
</style>

<video preload='none' use:onScroll={[scrollY, windowHeight]} src={src.fields.file.url} loop muted autoplay={false} disableRemotePlayback />