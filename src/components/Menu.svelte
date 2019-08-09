<script>
	import { fade, fly } from 'svelte/transition'
	import { elasticOut, bounceOut, backOut } from 'svelte/easing'

	import { stores } from '@sapper/app'
	const { preloading, page, session } = stores()

	export let segment
	let { films } = $session.navigation

	let visible = false
	let ys = new Array(7).fill(0)

	function toggle() {
		if (!visible) {
			ys = ys.map(y => (Math.random() * 200) + 100)
		}
		visible = !visible
	}
</script>

<style>
	button {
		position: fixed;
		z-index: 11;
		top: 0;
		right: 0;

		transform: rotate(90deg);
		font-size: 20pt;

		display: inline-block;
		border: none;
		padding: var(--rythm);
		background: transparent;
	}

	nav {
		position: fixed;
		z-index: 10;
		top: 0;
		right: 0;
		width: 100vw;
		height: 100vh;

		background: white;
	}

	nav > ul {
		list-style: none;
		padding: var(--gutter);
		margin: 0;

		display: flex;
		height: 100%;
	}

		nav > ul > li {
			color: white;
			background: black;
			padding: calc(var(--gutter) - 0.5vh);
			margin-right: calc(var(--gutter) / 2);
		}
			
			nav > ul > li > a {
				writing-mode: vertical-rl;
				transform: rotate(180deg);
				white-space: nowrap;
			}

			h5 {
				font-variation-settings: "wdth" 300;
			}
</style>

<button on:click={toggle}>
	☰
</button>

{#if visible}
<nav transition:fade>
	<ul>
		<li in:fly={{ y: ys[0], opacity: 1 }}>
			<a href='/' on:click={toggle}><h5>Latest</h5></a>
		</li>
		<li in:fly={{ y: ys[1], opacity: 1 }}>
			<a href='/films' on:click={toggle}><h5>Films</h5></a>
			<!-- <ul>
				{#each films.items as film}
				<li><a rel=prefetch href='/films/{film.fields.identifier}'>{film.fields.title}</a></li>
				{/each}
			</ul> -->
		</li>
		<li in:fly={{ y: ys[2], opacity: 1 }}>
			<a href='/news' on:click={toggle}><h5>News</h5></a>
		</li>
		<li in:fly={{ y: ys[3], opacity: 1 }}>
			<a href='/about' on:click={toggle}><h5>About</h5></a>
		</li>
		<li in:fly={{ y: ys[4], opacity: 1 }}>
			<a href='/shop' on:click={toggle}><h5>Shop</h5></a>
		</li>
		<li in:fly={{ y: ys[5], opacity: 1 }}>
			<a href='/contact' on:click={toggle}><h5>Contact</h5></a>
		</li>
		<li in:fly={{ y: ys[6], opacity: 1 }}>
			<a href='/fr-CA' on:click={toggle}><h5>Français</h5></a>
		</li>
	</ul>
</nav>
{/if}