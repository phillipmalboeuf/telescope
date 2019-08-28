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
	import Credits from '../../components/Credits.svelte'
	import List from '../../components/List.svelte'
	import Document from '../../components/document/index.svelte'

	export let article
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

	section {
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

	/* article > :global(h2),
	article > :global(h4),
	article > :global(h6),
	article > :global(p) {

	} */
</style>

<svelte:head>
	<title>{article.fields.title}</title>
</svelte:head>

<h1>{article.fields.title} • {#each article.fields.tags as tag}<a href="articles?tag={tag}">{tag}</a> {/each}</h1>

<section>
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
</section>

<List items={article.fields.relatedContent} full={false} />