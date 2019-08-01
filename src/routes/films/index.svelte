<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`films.json`).then(r => r.json()).then(films => {
			return { films };
		});
	}
</script>

<script>
	export let films;
</script>

<style>
</style>

<svelte:head>
	<title>Films</title>
</svelte:head>

<h1>Films</h1>

<ul>
	{#each films.items as film}
		<li><a rel='prefetch' href='/films/{film.fields.identifier}'>{film.fields.title}</a></li>
	{/each}
</ul>