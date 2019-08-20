<script>
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

<nav>
	<a href="/articles"><h6>News</h6></a>
	{#each tags as [tag, total]}
	<a href="/articles?tag={tag}"><h6>{tag}</h6></a> 
	{/each}
</nav>