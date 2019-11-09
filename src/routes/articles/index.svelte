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

		return {
			articles: articles.filter(article => {
				if (query.tag && query.collaborator) {
					return article.fields.tags.includes(query.tag) && article.fields.tags.includes(query.collaborator)
				} else if (query.tag) {
					return article.fields.tags.includes(query.tag)
				} else if (query.collaborator) {
					return article.fields.tags.includes(query.collaborator)
				}

				return true
			}),
			...query.tag && { currentTag: query.tag },
			...query.collaborator && { currentCollaborator: query.collaborator },
			tags
		}
	}
</script>

<script>
	import List from '../../components/List.svelte'
	import Filters from '../../components/Filters.svelte'

	export let articles
	export let tags
	export let currentTag = undefined
	export let currentCollaborator = undefined

	import { stores } from '@sapper/app'
	const { session } = stores()
</script>


<svelte:head>
	<title>News</title>
</svelte:head>

<Filters {tags} path="articles" all="{$session.locale === 'fr-CA' ? 'Toutes les nouvelles' : 'All News'}" {currentTag} {currentCollaborator} />

<List items={articles} />