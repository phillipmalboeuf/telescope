<script>
	import { stores } from '@sapper/app'
	const { session } = stores()

	let { tags } = $session.navigation
  export let id
</script>

{tags.find(t => t.fields.identifier === id)
  ? tags.find(t => t.fields.identifier === id).fields.title
  : id}


