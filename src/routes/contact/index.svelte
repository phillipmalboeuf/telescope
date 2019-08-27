<script context="module">
	import json from 'json-complete'

	export async function preload({ params, query }) {
		const res = await this.fetch(`contact.json`)
		const { contact, photo } = json.decode(await res.text())

		return { contact, photo }
	}
</script>

<script>
	import { onMount } from 'svelte'
	import NewsletterForm from '../../components/NewsletterForm.svelte'
	import Picture from '../../components/Picture.svelte'

	export let contact
	export let photo

	console.log(photo)

	onMount(() => {
		window.sk = window.sk||function(){(sk.q=sk.q||[]).push(arguments)}
		sk('form', '#newsletter-form', {
			id: 'b98ecb61f446'
		})
	})
</script>

<style>
figure {
	width: 32.5vw;
	margin: 0;
	margin-top: calc(var(--gutter) * -1);
	margin-left: calc(var(--gutter) * -1);
}

ol {
	width: 50vw;
	padding: 0;
  list-style: none;
	margin-left: auto;
	margin-top: calc(var(--gutter) * -4);
}

  ol > li {
		width: 32.5vw;
    margin-bottom: calc(var(--rythm) * 2);
  }
</style>


<svelte:head>
	<title>Contact</title>
</svelte:head>

<figure>
	<Picture media={photo} />
</figure>

<ol>
	<li>
		<NewsletterForm />
	</li>
{#each contact as point}
	<li>
		<a href={point.fields.link} target="_blank">
			<h4>{point.fields.title}</h4>
			<h6>{point.fields.linkLabel}</h6>
		</a>
	</li>
{/each}
</ol>