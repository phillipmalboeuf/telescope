<script context="module">
	import json from 'json-complete'

	export async function preload({ params, query }) {
		const res = await this.fetch(`articles.json`)
		const articles = json.decode(await res.text())

		return { articles }
	}
</script>

<script>
	import List from '../../components/List.svelte'
	export let articles
</script>

<style>
</style>

<svelte:head>
	<title>News</title>
</svelte:head>

<h1>News</h1>

<List items={articles} />