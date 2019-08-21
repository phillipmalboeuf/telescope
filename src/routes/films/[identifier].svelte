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
	import Document from '../../components/document/index.svelte'

	export let film
</script>

<style>
	section > :global(h2),
	section > :global(h4),
	section > :global(h6),
	section > :global(p) {
		width: 52.5vw;
		margin-left: auto;
	}
</style>

<svelte:head>
	<title>{film.fields.title}</title>
</svelte:head>


<Video poster={film.fields.poster} srcs={film.fields.video} title="{film.fields.title} • {film.fields.tags}" full controls grabs={film.fields.screenGrabs} />

<section>
	<Document body={film.fields.description} />
</section>
