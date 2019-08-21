<script context="module">
	import json from 'json-complete'

	export async function preload({ params, query }) {
		const res = await this.fetch(`articles/${params.identifier}.json`)
		const data = json.decode(await res.text())

		if (res.status === 200) {
			return { article: data }
		} else {
			this.error(res.status, data.message)
		}
	}
</script>

<script>
	import Document from '../../components/document/index.svelte'
	export let article;
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
	<title>{article.fields.title}</title>
</svelte:head>

<h1>{article.fields.title}</h1>

<section>
	<Document body={article.fields.body} />
</section>
