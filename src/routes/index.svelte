<script>
	import { fade } from 'svelte/transition'
	import Hover from '../components/Hover.svelte'
</script>

<style>
	h1 {
		font-family: 'Telescopique Splash', 'Telescopique', system-ui, -apple-system;
		font-size: 5vw;
		margin-bottom: 0;

		
	}
</style>

<svelte:head>
	<title>Telescope</title>
</svelte:head>

<h1>
	<Hover texts={['TELESCOPE', 'TELESCOPE', 'TELESCOPE', 'TELESCOPE', 'TELESCOPE', 'TELESCOPE', 'TELESCOPE']} />
</h1>