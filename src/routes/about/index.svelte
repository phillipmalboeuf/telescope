<script context="module">
	import json from 'json-complete'

	export async function preload({ params, query }) {
		const res = await this.fetch(`about.json`)
		const about = json.decode(await res.text())

		return { about }
	}
</script>

<script>
  import Document from '../../components/document/index.svelte'
	export let about

	import { stores } from '@sapper/app'
	const { session } = stores()
</script>

<style>
	nav {
		display: flex;
		margin: calc(var(--rythm) * -2.5) 0 calc(var(--rythm) * 1) calc(var(--rythm) / -2);
	}

		nav a {
			opacity: 0.35;
			padding: calc(var(--rythm) / 2);
		}

		nav a.current {
			opacity: 1;
		}

	section > :global(h2),
	section > :global(h4),
	section > :global(h6),
	section > :global(p),
	section > :global(picture) {
		display: block;
		width: 52.5vw;
		margin-left: auto;
	}

	@media (max-width: 900px) {
		nav {
			margin-top: calc(var(--rythm) * -0.5);
		}

		section > :global(h2),
		section > :global(h4),
		section > :global(h6),
		section > :global(p) {
			width: 100%;
		}
	}
</style>


<svelte:head>
	<title>About</title>
</svelte:head>

<nav>
	<a href=""><h6>Telescope</h6></a>
	<a href="about" class="current"><h6>{$session.locale === 'fr-CA' ? 'À propos' : 'About'}</h6></a>
	<!-- {#each about as piece}
	<a href="about#{piece.fields.identifier}"><h6>{piece.fields.title}</h6></a>
	{/each} -->
</nav>

{#each about as piece}
<section id={piece.fields.identifier}>
  <Document body={piece.fields.body} />
</section>
{/each}