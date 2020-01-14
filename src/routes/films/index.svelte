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

	
		return {
			films: films.filter(film => {
				if (query.tag && query.director) {
					return film.fields.tags.includes(query.tag) && film.fields.tags.includes(query.director)
				} else if (query.tag) {
					return film.fields.tags.includes(query.tag)
				} else if (query.director) {
					return film.fields.tags.includes(query.director)
				}

				return true
			}),
			...query.tag && { currentTag: query.tag },
			...query.director && { currentCollaborator: query.director },
			tags
		}

		// return { films, tags }
	}
</script>

<script>
	import List from '../../components/List.svelte'
	import Filters from '../../components/Filters.svelte'

	export let films
	export let tags
	export let currentTag = undefined
	export let currentCollaborator = undefined

	import { stores } from '@sapper/app'
	const { session } = stores()
</script>

<style>
</style>

<svelte:head>
	<title>Films</title>
</svelte:head>

<Filters {tags} path="films" all="{$session.locale === 'fr-CA' ? 'Tous les films' : 'All Films'}" {currentTag} {currentCollaborator} />

<List items={films} full={false} />