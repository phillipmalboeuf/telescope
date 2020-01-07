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

	onMount(() => {
		window.sk = window.sk||function(){(sk.q=sk.q||[]).push(arguments)}
		sk('form', '#newsletter-form', {
			id: 'b98ecb61f446'
		})
	})
</script>

<style>

section {
	display: flex;
	flex-wrap: wrap;
}

figure {
	width: 32.5vw;
	margin: 0;
	margin-top: calc(var(--gutter) * -1);
	margin-left: calc(var(--gutter) * -1);
}

nav {
	position: absolute;
	top: calc(var(--gutter) / 2);
	left: calc(var(--gutter) / 3);
	color: white;
	/* max-width: calc(32.5vw - var(--gutter)); */
}
	nav a:hover h6 {
		font-variation-settings: "wdth" 225;
	}

	nav a {
		padding: calc(var(--gutter) / 4);
	}

ol {
	width: 50vw;
	padding: calc(var(--gutter));
  list-style: none;
}

  ol > li {
		width: 32.5vw;
    margin-bottom: calc(var(--rythm) * 2);
  }

	ol > li :global(a:hover h4), ol > li :global(a:hover h6) {
    font-variation-settings: "wdth" 285;
  }

	@media (max-width: 900px) {
		figure {
			width: 100%;
		}

		ol {
			width: 100%;
			margin-top: calc(var(--gutter));
		}

		ol > li {
			width: 100%;
			margin-bottom: calc(var(--rythm));
		}
	}
</style>


<svelte:head>
	<title>Contact</title>
</svelte:head>


<section>
	<figure>
		<Picture media={photo} />
	</figure>

	<nav><h6><a href="" rel=prefetch>Telescope</a> <a rel=prefetch href="contact">Contact</a></h6></nav>

	<ol>
		<li>
			<NewsletterForm id="contact-page-newsletter-form" />
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
</section>