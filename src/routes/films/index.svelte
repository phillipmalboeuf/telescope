<script context="module">
	import json from 'json-complete'

	export async function preload({ params, query }) {
		const res = await this.fetch(`films.json`)
		const films = json.decode(await res.text())

		return { films }
	}
</script>

<script>
	export let films
</script>

<style>
</style>

<svelte:head>
	<title>Films</title>
</svelte:head>

<h1>Films</h1>

<ul>
	{#each films as film}
		<li><a rel='prefetch' href='/films/{film.fields.identifier}'>{film.fields.title}</a></li>
	{/each}
</ul>