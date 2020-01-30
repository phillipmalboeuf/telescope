<script context="module">
	import json from 'json-complete'

	export async function preload({ params, query }) {
		const res = await this.fetch(`directors.json`)
		const text = json.decode(await res.text())

		return { text }
	}
</script>

<script>
  import Document from '../../components/document/index.svelte'
	export let text

	import { stores } from '@sapper/app'
	const { session, page } = stores()
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

		nav a:hover h6 {
			font-variation-settings: "wdth" 225;
		}

		nav a.current {
			opacity: 1;
		}

	section > :global(h2),
	section > :global(h4),
	section > :global(h6),
	section > :global(p) {
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
	<title>{$session.locale === 'fr-CA' ? 'À propos' : 'About'}</title>
</svelte:head>

{#if $page.path === '/directors'}
<nav>
	<a href=""><h6>Telescope</h6></a>
	<a href="directors" class="current"><h6>{$session.locale === 'fr-CA' ? 'À propos' : 'About'}</h6></a>
</nav>

<section>
  <Document body={text.fields.body} />
</section>
{/if}