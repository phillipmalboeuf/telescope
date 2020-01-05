<script context="module">
	import json from 'json-complete'

	export async function preload({ params, query }) {
		const res = await this.fetch(`loose.json`)
		const { loose, animation } = json.decode(await res.text())

		return { loose, animation }
	}
</script>

<script>
	import Hover from '../components/Hover.svelte'
	import Picture from '../components/Picture.svelte'
	import List from '../components/List.svelte'

	import { stores } from '@sapper/app'
	const { preloading, page, session } = stores()

	let { films, articles, products } = $session.navigation
	export let loose
	export let animation

	let items = [...films, ...articles]
		.filter(item => item.fields.tags.includes('recent'))
		.sort((left, right) => {
			return new Date(right.fields.publishedDate) - new Date(left.fields.publishedDate)
		})

	items.splice(3, 0, loose)
</script>

<style>
	h1 {
		cursor: move;
		font-family: 'Telescopique Splash', 'Telescopique', system-ui, -apple-system;
		margin-bottom: calc(var(--gutter) * 2.5);
		line-height: 1.05;

		text-align: center;
		will-change: transform;
	}

	@media (max-width: 900px) {
    h1 {
      font-size: 6.33vw;
    }
  }
</style>

<svelte:head>
	<title>Telescope</title>
</svelte:head>

<h1>
	<!-- {#if $session.ua.chrome || $session.isMobile}
	<Picture media={animation} webp />
	{:else} -->
	<Hover texts={['TELESCOPE', 'TELESCOPE', 'TELESCOPE', 'TELESCOPE', 'TELESCOPE', 'TELESCOPE', 'TELESCOPE']} />
	<!-- {/if} -->
</h1>

<List {items} />