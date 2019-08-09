<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`news.json`).then(r => r.json()).then(articles => {
			return { articles }
		})
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

<List path='news' items={articles.items} />