<script>
	import Menu from '../components/Menu.svelte';

	export let segment;
</script>

<style>
	:global(*) {
    box-sizing: border-box;
  }

	:global(:root) {
    --rythm: 20px;
		--gutter: 5vw;
  }

	:global(html) {
    background-color: black;
  }

	:global(body) {
		font-family: system-ui, -apple-system;
    font-size: 20px;
    line-height: 1.333;

		color: black;
		background: white;

		margin: 0;
	}

	main {
		min-height: 100vh;
		padding: var(--gutter);
	}

	:global(h1, h2, h3, h4, h5, h6, p) {
    margin: 0 0 var(--rythm);
    /* white-space: pre-line; */
  }

	:global(h1, h2, h3, h4, h5, h6) {
    font-family: 'Telescopique', system-ui, -apple-system;
    font-size: calc(var(--rythm)*2);
    font-weight: normal;
		text-transform: uppercase;
    line-height: 1;
  }

	:global(h4, h5, h6) {
    font-size: var(--rythm);
    margin-bottom: calc(var(--rythm)/2);
  }

	:global(p:last-child) {
    margin-bottom: 0;
  }

	:global(p + h1, p + h2, p + h3,
		ul + h1, ul + h2, ul + h3,
		ol + h1, ol + h2, ol + h3) {
    margin-top: calc(var(--rythm)*2);
  }

	:global(small) {
    font-size: calc(var(--rythm)/1.333);
    line-height: calc(var(--rythm)/1.333);
  }

	:global(ul, ol) {
    margin: 0 0 var(--rythm);
    padding-left: var(--rythm);
  }

	:global(a, button) {
    outline: none;
    cursor: pointer;
    color: inherit;
    text-decoration: none;
    position: relative;
  }

  :global(a:active, button:active) {
    top: 1px;
  }
</style>

<main>
	<slot></slot>
</main>

<Menu {segment} />