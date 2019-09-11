<script>
	import { onMount, tick } from 'svelte'
	import { fade, fly } from 'svelte/transition'
	import { elasticOut, bounceOut, backOut } from 'svelte/easing'

	import MenuItems from './MenuItems.svelte'

	import { stores } from '@sapper/app'
	const { preloading, page, session } = stores()

	export let segment
	let { films, articles, products, about, contact } = $session.navigation

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

	function updateHeight() {
		height = document.body.offsetHeight - window.innerHeight
	}

	onMount(() => {
		updateHeight()

		page.subscribe(async ()=> {
			await tick()
			updateHeight()
		})
	})

	function columns(page) {
		return [
			{
				title: $session.locale === 'fr-CA' ? 'Récents' : 'Latest',
				all: $session.locale === 'fr-CA' ? 'Page d\'acceuil' : 'Homepage',
				path: '',
				items: [...films, ...articles, ...products]
					.filter(item => item.fields.tags.includes('recent'))
					.sort((left, right) => {
						return new Date(right.fields.publishedDate) - new Date(left.fields.publishedDate)
					})
			},
			{
				title: $session.locale === 'fr-CA' ? 'Films' : 'Films',
				all: $session.locale === 'fr-CA' ? 'Aperçu de tout les Films' : 'Overview of all Films',
				path: 'films',
				items: films
			},
			{
				title: $session.locale === 'fr-CA' ? 'Nouvelles' : 'News',
				all: $session.locale === 'fr-CA' ? 'Aperçu de toutes les Nouvelles' : 'Overview of all News',
				path: 'articles',
				items: articles
			},
			{
				title: $session.locale === 'fr-CA' ? 'À propos' : 'About',
				path: 'about',
				items: about,
			},
			{
				title: $session.locale === 'fr-CA' ? 'Boutique' : 'Shop',
				all: $session.locale === 'fr-CA' ? 'Aperçu de toute la Boutique' : 'Overview of all Items',
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
				path: $session.locale === 'fr-CA' ? `/en${page.path}` : page.path,
				items: [{ type: 'locales', current: $session.locale, path: page.path }]
			}
		]
	}
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

		font-size: var(--tiny);

		display: inline-block;
		padding: calc(var(--gutter) / 2.25);

		text-shadow: white 1px 1px;
	}

	@media (max-width: 900px) {
		button {
			padding: calc(var(--gutter) / 3);
		}
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

	nav :global(a:hover h4), nav :global(a:hover h6) {
    font-variation-settings: "wdth" 285;
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

		@media (max-width: 900px) {
			ul > li {
				margin-right: calc(var(--gutter) / 4);
			}
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

		@media (max-width: 900px) {
			ul > li > a {
				height: 100%;
				text-align: right;
			}

			ul > li > a > h4 {
				padding: calc(var(--gutter) - 7pt);
			}
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
		{#each columns($page) as column, index}
		<li class:selected={selected === index} on:mouseenter={()=> !$session.isMobile && enter(index)} in:fly={{ y: ys[index], opacity: 1 }}>
			<a rel=prefetch href='{column.path}' on:click={toggle}><h4>{column.title}</h4></a>

			{#if !$session.isMobile}<MenuItems items={column.items} all={column.all && { title: column.all, path: column.path }} on:click={toggle} />{/if}
		</li>
		{/each}
	</ul>
</nav>
{:else}
<nav class="bottom">
	<ul on:mouseleave={leave} class:selected={selected !== undefined}>
		{#each columns($page) as column, index}
		<li class:selected={selected === index} on:mouseenter={()=> !$session.isMobile && enter(index)}>
			<a rel=prefetch href='{column.path}'><h4>{column.title}</h4></a>

			{#if !$session.isMobile}<MenuItems items={column.items} all={column.all && { title: column.all, path: column.path }} />{/if}
		</li>
		{/each}
	</ul>
</nav>
{/if}