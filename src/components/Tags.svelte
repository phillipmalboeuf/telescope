<script>
  export let tags
	export let path
	export let all
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

<nav>
	<a href="{path}"><h6>{all}</h6></a>
	{#each tags as [tag, total]}
	<a href="{path}?tag={tag}"><h6>{tag}</h6></a> 
	{/each}
</nav>