<script context="module">
	import json from 'json-complete'

	export async function preload({ params, query }) {
		const res = await this.fetch(`products/${params.identifier}.json`)
		const data = json.decode(await res.text())

		if (res.status === 200) {
			return { product: data }
		} else {
			this.error(res.status, data.message)
		}
	}
</script>

<script>
	import Document from '../../components/document/index.svelte'
	export let product;
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
	<title>{product.fields.title}</title>
</svelte:head>

<h1>{product.fields.title}</h1>

<section>
	<Document body={product.fields.description} />
</section>
