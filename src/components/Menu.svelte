<script>
	import { onMount } from 'svelte'
	import { fade, fly } from 'svelte/transition'
	import { elasticOut, bounceOut, backOut } from 'svelte/easing'

	import MenuItems from './MenuItems.svelte'

	import { stores } from '@sapper/app'
	const { preloading, page, session } = stores()

	export let segment
	let { films, articles, products, about, contact } = $session.navigation

	const columns = [
		{
			title: $session.locale === 'fr-CA' ? 'Nouveautés' : 'Latest',
			path: '',
			items: [...films, ...articles, ...products].filter(item => item.fields.tags.includes('latest'))
		},
		{
			title: $session.locale === 'fr-CA' ? 'Films' : 'Films',
			path: 'films',
			items: films
		},
		{
			title: $session.locale === 'fr-CA' ? 'Nouvelles' : 'News',
			path: 'articles',
			items: articles
		},
		{
			title: $session.locale === 'fr-CA' ? 'À propos' : 'About',
			path: 'about',
			items: about,
		},
		{
			title: $session.locale === 'fr-CA' ? 'Magasin' : 'Shop',
			path: 'products',
			items: products
		},
		{
			title: 'Contact',
			path: 'contact',
			items: [{ type: 'newsletter' }, ...contact]
		},
		{
			title: $session.locale === 'fr-CA' ? 'English' : 'Français',
			path: $session.locale === 'fr-CA' ? `/en${$page.path}` : $page.path,
			items: [{ type: 'locales', current: $session.locale, path: $page.path }]
		}
	]

	let visible = false
	let ys = new Array(7).fill(0)

	let selected = undefined

	let y
	let height

	function toggle() {
		if (!visible) {
			ys = ys.map(y => (Math.random() * 200) + 100)
		}

		document.documentElement.classList.toggle('noscroll')
		visible = !visible
	}

	function enter(index) {
		selected = index
	}

	function leave() {
		selected = undefined
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	onMount(() => {
		height = document.body.offsetHeight - window.innerHeight
	})
</script>

<style>
	:global(html.noscroll) {
    overflow: hidden;
  }

	button {
		position: fixed;
		z-index: 11;
		top: 0;
		right: 0;

		font-size: 7pt;

		display: inline-block;
		padding: calc(var(--gutter) / 2.25) calc(var(--gutter) / 2.25);

		text-shadow: white 2px 2px;
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

	nav.bottom ul {
		margin-top: calc(var(--gutter) * -1);
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

		ul > li:last-child {
			margin-right: 0;
		}

		ul > li.selected {
			flex: 7;
		}

		ul > li > a > h4 {
			padding: calc(var(--gutter) - 5pt);
			transition: transform 333ms, font-variation-settings 333ms;
		}

		ul.selected > li > a > h4 {
			transform: translateX(calc(var(--gutter) * -0.5));
		}

		ul.selected > li.selected > a > h4 {
			transform: translateX(0);
		}

			ul > li > a {
				position: absolute;
				top: 0;
				right: 0;
				writing-mode: vertical-rl;
				transform: rotate(180deg);
				white-space: nowrap;
			}
</style>

<svelte:window bind:scrollY={y} />

{console.log(height)}
{console.log(y)}
{#if height && y >= height - 10}
<button on:click={scrollToTop} style="transform: rotate(-90deg)">
	→
</button>
{:else}
<button on:click={toggle}>
	{#if visible}⎚{:else}☰{/if}
</button>
{/if}

{#if visible}
<nav transition:fade>
	<ul on:mouseleave={leave} class:selected={selected !== undefined}>
		{#each columns as column, index}
		<li class:selected={selected === index} on:mouseenter={()=> enter(index)} in:fly={{ y: ys[0], opacity: 1 }}>
			<a href='{column.path}' on:click={toggle}><h4>{column.title}</h4></a>

			<MenuItems items={column.items} on:click={toggle} />
		</li>
		{/each}
	</ul>
</nav>
{:else}
<nav class="bottom">
	<ul on:mouseleave={leave} class:selected={selected !== undefined}>
		{#each columns as column, index}
		<li class:selected={selected === index} on:mouseenter={()=> enter(index)}>
			<a href='{column.path}'><h4>{column.title}</h4></a>

			<MenuItems items={column.items} />
		</li>
		{/each}
	</ul>
</nav>
{/if}