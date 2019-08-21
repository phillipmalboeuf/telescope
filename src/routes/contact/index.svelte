<script context="module">
	import json from 'json-complete'

	export async function preload({ params, query }) {
		const res = await this.fetch(`contact.json`)
		const contact = json.decode(await res.text())

		return { contact }
	}
</script>

<script>
	export let contact
</script>


<svelte:head>
	<title>Contact</title>
</svelte:head>

{#each contact as point}
{point.fields.title}
{/each}