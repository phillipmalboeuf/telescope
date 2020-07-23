<script context="module">
	import json from 'json-complete'

	const limit = 6

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

		const filteredFilm = films.filter(film => {
			if (query.tag && query.director) {
				return film.fields.tags.includes(query.tag) && film.fields.tags.includes(query.director)
			} else if (query.tag) {
				return film.fields.tags.includes(query.tag)
			} else if (query.director) {
				return film.fields.tags.includes(query.director)
			}

			return true
		})
	
		return {
			films: filteredFilm.splice((query.p || 0) * limit, limit),
			...query.tag && { currentTag: query.tag },
			...query.director && { currentCollaborator: query.director },
			currentPage: parseInt(query.p || 0),
			numberOfPages: Math.ceil(filteredFilm.length / limit) + 1,
			tags
		}

		// return { films, tags }
	}
</script>

<script>
	import List from '../../components/List.svelte'
	import Filters from '../../components/Filters.svelte'
	import Pagination from '../../components/Pagination.svelte'

	export let films
	export let tags
	export let currentTag = undefined
	export let currentCollaborator = undefined

	export let currentPage
	export let numberOfPages

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
<Pagination path="films" currentPage={currentPage} numberOfPages={numberOfPages} />