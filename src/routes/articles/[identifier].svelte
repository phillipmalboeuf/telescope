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
</style>

<svelte:head>
	<title>{article.fields.title}</title>
</svelte:head>

<h1>{article.fields.title} • {article.fields.tags}</h1>

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
