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
		position: -webkit-sticky;
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
</style>

<svelte:head>
	<title>{article.fields.title}</title>
</svelte:head>

<section>
	<nav><h1>{article.fields.title} • <Tags tags={article.fields.tags} path="articles" /></h1></nav>

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

			<p><Credits credits={article.fields.creditList} /></p>
		</article>
	</div>
</section>

{#if article.fields.relatedContent}
<List items={article.fields.relatedContent} full={false} />
{/if}