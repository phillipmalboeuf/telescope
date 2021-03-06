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

	import { stores } from '@sapper/app'
	const { session } = stores()
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

	nav + nav {
		top: calc(var(--gutter) / -2);
		left: calc(var(--gutter) / -2);
		right: auto;
		height: auto;
		color: white;
		max-width: calc(42.5vw - var(--gutter));
	}

	h1 {
		position: -webkit-sticky;
		position: sticky;
		top: var(--gutter);

		font-size: var(--small);
		writing-mode: vertical-rl;
		transform: rotate(180deg) translateX(2px);
		white-space: nowrap;
	}

	section div {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: calc(var(--rythm) * 2);
	}

	aside {
		width: 42.5vw;

		margin-top: calc(var(--gutter) * -1);
		margin-left: calc(var(--gutter) * -1);
	}

	@media (max-width: 900px) {
		aside {
			width: 100%;
		}
	}

	aside figure {
		margin: 0 0 var(--rythm);
	}

	article {
		width: 37.5vw;
		margin: calc(var(--gutter) * 4) calc(var(--gutter) * 2) calc(var(--rythm) * 2) auto;
	}

	@media (max-width: 900px) {
		article {
			width: 100%;
			margin: 0 calc(var(--gutter) * 2) calc(var(--rythm) * 2) auto;
		}
	}

	@media (max-width: 900px) {
		h1 {
			font-size: var(--tiny);
		}
	}

	button {
		font-size: var(--medium);
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
	<nav><h6><a href="" rel=prefetch>Telescope</a> • <a rel=prefetch href="products">{$session.locale === 'fr-CA' ? 'Boutique' : 'Shop'}</a> • {product.fields.title} • <Tags tags={product.fields.tags} path="products" /></h6></nav>

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
<List items={product.fields.relatedContent.map(item => ({
    ...item,
    type: item.type || item.sys.contentType.sys.id
  }))} full={false} />
{/if}