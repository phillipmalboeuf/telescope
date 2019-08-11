<script>
	import { stores } from '@sapper/app'
	const { session } = stores()

	let { tags } = $session.navigation
  export let id

  let tag = tags.find(t => t.fields.identifier === id)
  if (tag) {
    tag = tag.fields.title
  } else {
    tag = id
  }
</script>

{tag}


