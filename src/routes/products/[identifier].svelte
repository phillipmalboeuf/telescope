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
	import Picture from '../../components/Picture.svelte'
  import Video from '../../components/Video.svelte'
  import Tag from '../../components/Tag.svelte'
	import Document from '../../components/document/index.svelte'
	
	export let product
</script>

<style>
	h1 {
		position: absolute;
		top: var(--gutter);
		right: var(--gutter);

		font-size: 15pt;
		writing-mode: vertical-rl;
		transform: rotate(180deg) translateX(2px);
		white-space: nowrap;
	}

	aside {
		width: 47.5vw;

		position: absolute;
		top: 0;
		left: 0;
		margin-top: calc(var(--gutter) * -1);
		margin-left: calc(var(--gutter) * -1);
	}

	aside figure {
		margin: 0 0 var(--rythm);
	}

	article {
		margin-top: calc(var(--gutter) * 4);
	}

	article > :global(h2),
	article > :global(h4),
	article > :global(h6),
	article > :global(p) {
		width: 37.5vw;
		margin-left: auto;
		margin-right: calc(var(--gutter) * 2);
	}

	button {
		font-size: 15pt;
		padding: 0;
	}

	button[disabled] {
		pointer-events: none;
		text-decoration: line-through;
	}
</style>

<svelte:head>
	<title>{product.fields.title}</title>
</svelte:head>

<h1>{product.fields.title} • {product.fields.tags}</h1>

<aside>
	{#each product.fields.photos as photo}
	<figure>
		<Picture media={photo} />
	</figure>
	{/each}
</aside>

<article>
	<h4>{#each product.fields.sizes as size, index}{#if index}&nbsp;• {/if}{size}{/each}</h4>
	<h6>Sizing</h6>
	<hr />
	<h4>{#each product.fields.colors as color, index}{#if index}&nbsp;• {/if}{color}{/each}</h4>
	<h6>Colors</h6>
	<hr />
	<h4>{#if product.fields.soldOut}Sold Out{:else}{product.fields.price}{/if}</h4>
	<h6>Price</h6>
	<hr />
	<h4>01</h4>
	<h6>Quantity</h6>
	<hr />
	<p><button disabled>Add to Cart</button></p>

	<hr />

	<Document body={product.fields.description} />
</article>
