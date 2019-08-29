<script context="module">
	import json from 'json-complete'

	export async function preload({ params, query }) {
		const res = await this.fetch(`loose.json`)
		const { loose } = json.decode(await res.text())

		return { loose }
	}
</script>

<script>
	import { fade } from 'svelte/transition'
	import Hover from '../components/Hover.svelte'
	import List from '../components/List.svelte'

	import { stores } from '@sapper/app'
	const { preloading, page, session } = stores()

	let { films, articles, products } = $session.navigation
	export let loose

	let items = [...films, ...articles, ...products]
		.filter(item => item.fields.tags.includes('latest'))
		.sort((left, right) => {
			return new Date(right.fields.publishedDate) - new Date(left.fields.publishedDate)
		})

	items.splice(5, 0, loose)
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
</style>

<svelte:head>
	<title>Telescope</title>
</svelte:head>

<h1>
	<Hover texts={['TELESCOPE', 'TELESCOPE', 'TELESCOPE', 'TELESCOPE', 'TELESCOPE', 'TELESCOPE', 'TELESCOPE']} />
</h1>

<List {items} />