<script context="module">
	import json from 'json-complete'

	export async function preload({ params, query }) {
		const res = await this.fetch(`films.json`)
		const films = json.decode(await res.text())

		let tags = {}
		films.forEach(film => {
			film.fields.tags.forEach(tag => {
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
			return { films: films.filter(film => film.fields.tags.includes(query.tag)), tags }
		}

		return { films, tags }
	}
</script>

<script>
	import List from '../../components/List.svelte'
	import Tags from '../../components/Tags.svelte'

	export let films
	export let tags

	import { stores } from '@sapper/app'
	const { session } = stores()
</script>

<style>
</style>

<svelte:head>
	<title>Films</title>
</svelte:head>

<Tags {tags} path="films" all="{$session.locale === 'fr-CA' ? 'Tous les films' : 'All Films'}" nav />

<List items={films} full={false} />