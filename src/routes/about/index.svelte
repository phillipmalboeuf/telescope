<script context="module">
	import json from 'json-complete'

	export async function preload({ params, query }) {
		const res = await this.fetch(`about.json`)
		const about = json.decode(await res.text())

		return { about }
	}
</script>

<script>
  import Document from '../../components/document/index.svelte'
	export let about
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
	<title>About</title>
</svelte:head>

{#each about as piece}
<section id={piece.fields.identifier}>
  <Document body={piece.fields.body} />
</section>
{/each}