<script>
	import { fade, fly } from 'svelte/transition'
	import { elasticOut, bounceOut, backOut } from 'svelte/easing'

	import { stores } from '@sapper/app'
	const { preloading, page, session } = stores()

	export let segment
	let { films, articles, products } = $session.navigation

	const columns = [
		{
			title: 'Latest',
			path: '',
			items: [...films, ...articles, ...products]
		},
		{
			title: 'Films',
			path: 'films',
			items: films
		},
		{
			title: 'News',
			path: 'articles',
			items: articles
		},
		{
			title: 'About',
			path: 'about'
		},
		{
			title: 'Shop',
			path: 'shop',
			items: products
		},
		{
			title: 'Contact',
			path: 'contact'
		},
		{
			title: 'English',
			path: 'en-US'
		}
	]

	let visible = false
	let ys = new Array(7).fill(0)

	let selected = undefined

	function toggle() {
		if (!visible) {
			ys = ys.map(y => (Math.random() * 200) + 100)
		}
		visible = !visible
	}

	function enter(index) {
		selected = index
	}

	function leave() {
		selected = undefined
	}
</script>

<style>
	button {
		position: fixed;
		z-index: 11;
		top: 0;
		right: 0;

		font-size: 12pt;

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

	nav.bottom {
		position: relative;
	}

	ul {
		list-style: none;
		padding: var(--gutter);
		margin: 0;

		display: flex;
		justify-content: center;
		height: 100%;
	}

		ul > li {
			color: white;
			background: black;
			margin-right: calc(var(--gutter) / 2);

			position: relative;
			overflow-y: auto;

			flex: 1;
			transition: flex 333ms;
		}

		ul > li.selected {
			flex: 7;
		}

		ul > li > a > h4 {
			padding: calc(var(--gutter) - 6pt);
			transition: transform 333ms;
		}

		ul.selected > li > a > h4 {
			transform: translateX(calc(var(--gutter) * -0.5));
		}

			ul > li > a {
				position: absolute;
				top: 0;
				right: 0;
				writing-mode: vertical-rl;
				transform: rotate(180deg);
				white-space: nowrap;
			}

	ol {
		position: absolute;
		top: var(--gutter);
		right: calc(var(--gutter) * 2.5);
		width: calc(var(--gutter) * 4.5);

		list-style: none;
	}

		ol > li {
			margin-bottom: calc(var(--rythm) * 2);
		}
</style>

<button on:click={toggle}>
	{#if visible}⎚{:else}☰{/if}
</button>

{#if visible}
<nav transition:fade>
	<ul on:mouseleave={leave} class:selected={selected !== undefined}>
		{#each columns as column, index}
		<li class:selected={selected === index} on:mouseenter={()=> enter(index)} in:fly={{ y: ys[0], opacity: 1 }}>
			<a href='/{column.path}' on:click={toggle}><h4>{column.title}</h4></a>

			<ol>
				{#if column.items}
				{#each column.items as item}
				<li>
					<a rel=prefetch href='/{item.type}s/{item.fields.identifier}' on:click={toggle}>
						<h4>{item.fields.title}</h4>
						<h6>{item.fields.tags}</h6>
					</a>
				</li>
				{/each}
				{/if}
			</ol>
		</li>
		{/each}
	</ul>
</nav>
{:else}
<nav class="bottom">
	<ul on:mouseleave={leave} class:selected={selected !== undefined}>
		{#each columns as column, index}
		<li class:selected={selected === index} on:mouseenter={()=> enter(index)}>
			<a href='/{column.path}'><h4>{column.title}</h4></a>

			<ol>
				{#if column.items}
				{#each column.items as item}
				<li>
					<a rel=prefetch href='/{item.type}s/{item.fields.identifier}'>
						<h4>{item.fields.title}</h4>
						<h6>{item.fields.tags}</h6>
					</a>
				</li>
				{/each}
				{/if}
			</ol>
		</li>
		{/each}
	</ul>
</nav>
{/if}