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
		margin: 0;
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

		<p><Credits credits={film.fields.creditList} /></p>
	</article>
</section>

{#if film.fields.relatedContent}
<List items={film.fields.relatedContent} full={false} />
{/if}