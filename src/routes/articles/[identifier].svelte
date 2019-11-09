<script context="module">
	import json from 'json-complete'

	export async function preload({ params, query }) {
		const res = await this.fetch(`articles/${params.identifier}.json`)
		const data = json.decode(await res.text())

		if (res.status === 200) {
			return { article: data }
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
	import Credits from '../../components/Credits.svelte'
	import List from '../../components/List.svelte'
	import Document from '../../components/document/index.svelte'

	export let article

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
		left: calc(var(--gutter) / -1.5);
		right: auto;
		height: auto;
		color: white;
		max-width: calc(42.5vw - var(--gutter));
	}

	nav + nav a {
		padding: calc(var(--gutter) / 4);
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
</style>

<svelte:head>
	<title>{article.fields.title}</title>
</svelte:head>

<section>
	<nav><h1>{article.fields.title} • <Tags tags={article.fields.tags} path="articles" /></h1></nav>
	<nav><h6><a href="" rel=prefetch>Telescope</a> <a rel=prefetch href="articles">{$session.locale === 'fr-CA' ? 'Retour aux Nouvelles' : 'Back to News'}</a></nav>

	<div>
		<aside>
			{#each article.fields.photos as photo}
			<figure>
				<Picture media={photo} />
			</figure>
			{/each}
		</aside>

		<article>
			<Document body={article.fields.body} />

			{#if article.fields.creditList}<p><Credits credits={article.fields.creditList} /></p>{/if}
		</article>
	</div>
</section>

{#if article.fields.relatedContent}
<List items={article.fields.relatedContent.map(item => ({
    ...item,
    type: item.type || item.sys.contentType.sys.id
  }))} full={false} />
{/if}