<script>
	import { fade } from 'svelte/transition'
	import Hover from '../components/Hover.svelte'
	import List from '../components/List.svelte'

	import { stores } from '@sapper/app'
	const { preloading, page, session } = stores()

	let { films, articles, products } = $session.navigation

	let items = [...films, ...articles, ...products]
		.filter(item => item.fields.tags.includes('latest'))
</script>

<style>
	/* h1 {
		font-family: 'Telescopique Splash', 'Telescopique', system-ui, -apple-system;
		margin-bottom: 0;
	} */
</style>

<svelte:head>
	<title>Telescope</title>
</svelte:head>

<List {items} />

<!-- <h1>
	<Hover texts={['TELESCOPE', 'TELESCOPE', 'TELESCOPE', 'TELESCOPE', 'TELESCOPE', 'TELESCOPE', 'TELESCOPE']} />
</h1> -->