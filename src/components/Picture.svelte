<script>
  export let media
</script>

<style>
  img {
    width: 100%;
  }
</style>

<picture>
  <img src="{media.fields.file.url}" alt="{media.fields.title} {media.fields.description}" />
</picture>