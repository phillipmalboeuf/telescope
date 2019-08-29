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
	import Tags from '../../components/Tags.svelte'
	import List from '../../components/List.svelte'
	import Document from '../../components/document/index.svelte'
	
	export let product
</script>

<style>
	section {
		position: relative;
	}

	nav {
		position: absolute;
		top: 0;
		right: 0;
		height: 100%;
	}

	h1 {
		position: sticky;
		top: var(--gutter);

		font-size: 12pt;
		writing-mode: vertical-rl;
		transform: rotate(180deg) translateX(2px);
		white-space: nowrap;
	}

	section div {
		display: flex;
		margin-bottom: calc(var(--rythm) * 2);
	}

	aside {
		width: 42.5vw;

		margin-top: calc(var(--gutter) * -1);
		margin-left: calc(var(--gutter) * -1);
	}

	aside figure {
		margin: 0 0 var(--rythm);
	}

	article {
		width: 37.5vw;
		margin: calc(var(--gutter) * 4) calc(var(--gutter) * 2) calc(var(--rythm) * 2) auto;
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

<section>
	<nav><h1>{product.fields.title} • <Tags tags={product.fields.tags} path="products" /></h1></nav>

	<div>
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
	</div>
</section>

{#if product.fields.relatedContent}
<List items={product.fields.relatedContent} full={false} />
{/if}