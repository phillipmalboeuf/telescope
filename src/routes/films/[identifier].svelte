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
	import Tags from '../../components/Tag.svelte'
	import Credits from '../../components/Credits.svelte'
	import List from '../../components/List.svelte'
	import Document from '../../components/document/index.svelte'

	export let film
</script>

<style>
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
	}

	h1 {
    font-size: 7pt;
  }
</style>

<svelte:head>
	<title>{film.fields.title}</title>
</svelte:head>


<Video poster={film.fields.poster} srcs={film.fields.video} full controls grabs={film.fields.screenGrabs}>
	<h1 slot="title">
		{film.fields.title} • {#each film.fields.tags as tag, index}
{#if tag !== 'latest'}
{#if index}, {/if}<a href="films?tag={tag}"><Tag id={tag} /></a> 
{/if}
{/each}
	</h1>
</Video>

<aside>
	<Document body={film.fields.crew} />
</aside>

<article>
	<Document body={film.fields.description} />

	<p><Credits credits={film.fields.creditList} /></p>
</article>

{#if film.fields.relatedContent}
<List items={film.fields.relatedContent} full={false} />
{/if}