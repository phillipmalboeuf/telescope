<script context="module">
	import json from 'json-complete'

	export async function preload({ params, query }) {
		const res = await this.fetch(`films/${params.identifier}.json`)
		const data = json.decode(await res.text())

		if (res.status === 200) {
			return { film: data }
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

	export let film
</script>

<style>
	section {
		position: relative;
	}

	aside {
		width: 32.5vw;
	}

	article {
		margin-top: calc(var(--gutter) * -3);
		margin-bottom: calc(var(--rythm) * 2);
	}

	article > :global(h2),
	article > :global(h4),
	article > :global(h6),
	article > :global(p) {
		width: 52.5vw;
		margin-left: auto;
		margin-right: var(--gutter);
	}

	@media (max-width: 900px) {
		aside {
			width: 100%;
		}

		article {
			margin-top: calc(var(--gutter));
			margin-right: calc(var(--gutter));
		}

		article > :global(h2),
		article > :global(h4),
		article > :global(h6),
		article > :global(p) {
			width: 100%;
		}
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

		font-size: var(--small);
		writing-mode: vertical-rl;
		transform: rotate(180deg) translateX(2px);
		white-space: nowrap;
		margin: 0;
  }

	@media (max-width: 900px) {
		h1 {
			font-size: var(--tiny);
		}
	}
</style>

<svelte:head>
	<title>{film.fields.title}</title>
</svelte:head>

<Video poster={film.fields.poster} srcs={film.fields.video} full controls grabs={film.fields.screenGrabs}>
	<h6 slot="title">
		{film.fields.title} • <Tags tags={film.fields.tags} path="films" />
	</h6>
</Video>

<section>
	<nav><h1>{film.fields.title} • <Tags tags={film.fields.tags} path="films" /></h1></nav>

	<aside>
		<Document body={film.fields.crew} />
	</aside>

	<article>
		<Document body={film.fields.description} />

		{#if film.fields.creditList}<p><Credits credits={film.fields.creditList} /></p>{/if}
	</article>
</section>

{#if film.fields.relatedContent}
<List items={film.fields.relatedContent.map(item => ({
    ...item,
    type: item.type || item.sys.contentType.sys.id
  }))} full={false} />
{/if}