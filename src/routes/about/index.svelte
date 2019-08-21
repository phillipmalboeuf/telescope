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


<svelte:head>
	<title>About</title>
</svelte:head>

{#each about as piece}
<section id={piece.fields.identifier}>
  <Document body={piece.fields.body} />
</section>
{/each}