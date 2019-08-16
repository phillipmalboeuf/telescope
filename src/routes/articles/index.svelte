<script context="module">
	import json from 'json-complete'

	export async function preload({ params, query }) {
		const res = await this.fetch(`articles.json`)
		const articles = json.decode(await res.text())

		let tags = {}
		articles.forEach(article => {
			article.fields.tags.forEach(tag => {
				if (tags[tag]) {
					tags[tag]++
				} else {
					tags[tag] = 1
				}
			})
		})

		tags = Object.entries(tags)
		tags.sort((left, right) => right[1] - left[1])

		if (query.tag) {
			return { articles: articles.filter(article => article.fields.tags.includes(query.tag)), tags }
		}

		return { articles, tags }
	}
</script>

<script>
	import List from '../../components/List.svelte'
	export let articles
	export let tags
</script>

<style>
	nav {
		display: flex;
		margin: calc(var(--rythm) / -2) 0 calc(var(--rythm) * 2) calc(var(--rythm) / -2);
	}

		nav a {
			padding: calc(var(--rythm) / 2);
		}
</style>

<svelte:head>
	<title>News</title>
</svelte:head>

<nav>
	<a href="/articles"><h6>News</h6></a>
	{#each tags as [tag, total]}
	<a href="/articles?tag={tag}"><h6>{tag}</h6></a> 
	{/each}
</nav>

<List items={articles} />