<script context="module">
	import json from 'json-complete'

	export async function preload({ params, query }) {
		const res = await this.fetch(`products.json`)
		const products = json.decode(await res.text())

		let tags = {}
		products.forEach(product => {
			product.fields.tags.forEach(tag => {
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
			return { products: products.filter(product => product.fields.tags.includes(query.tag)), tags, currentTag: query.tag }
		}

		return { products, tags }
	}
</script>

<script>
	import List from '../../components/List.svelte'
	import Tags from '../../components/Tags.svelte'

	export let products
	export let tags
	export let currentTag = undefined

	import { stores } from '@sapper/app'
	const { session } = stores()
</script>


<svelte:head>
	<title>Shop</title>
</svelte:head>

<Tags {tags} path="products" all="{$session.locale === 'fr-CA' ? 'Tous les produits' : 'All Products'}" nav {currentTag} />

<List items={products} />