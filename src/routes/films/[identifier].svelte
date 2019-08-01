<script context="module">
	export async function preload({ params, query }) {
		const res = await this.fetch(`films/${params.identifier}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { film: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	export let film;
</script>

<style>
</style>

<svelte:head>
	<title>{film.fields.title}</title>
</svelte:head>

<h1>{film.fields.title}</h1>

<div class='content'>
	<!-- {@html film.html} -->
	{JSON.stringify(film.fields.description)}
</div>
