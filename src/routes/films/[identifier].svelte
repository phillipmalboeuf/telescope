<script context="module">
	import json from 'json-complete'

	export async function preload({ params, query }) {
		const res = await this.fetch(`films/${params.identifier}.json`)
		const data = json.decode(await res.text())

		if (res.status === 200) {
			return { film: data }
		} else {
			this.error(res.status, data.message)
		}
	}
</script>

<script>
	import Picture from '../../components/Picture.svelte'
  import Video from '../../components/Video.svelte'
  import Tag from '../../components/Tag.svelte'

	export let film
</script>

<style>
</style>

<svelte:head>
	<title>{film.fields.title}</title>
</svelte:head>

<h1>{film.fields.title}</h1>

<div class='content'>
	<Video poster={film.fields.poster} srcs={film.fields.video} />
</div>
