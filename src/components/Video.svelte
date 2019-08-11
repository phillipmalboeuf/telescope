<script>
  export let poster
  export let srcs
</script>

<style>
  video {
    width: 100%;
  }
</style>

<video src={srcs ? srcs[0].fields.file.url : undefined} poster={poster.fields.file.url} loop muted controls />