<script>
	import Tag from './Tag.svelte'
  export let tags
	export let path
	export let all = undefined

	export let nav = false
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

{#if nav}
<nav>
	<a href="{path}"><h6>{all}</h6></a>
	{#each tags as [tag, total]}
	{#if tag !== 'latest'}
	<a href="{path}?tag={tag}"><h6><Tag id={tag} /></h6></a> 
	{/if}
	{/each}
</nav>
{:else}
{#each tags as tag, index}
{#if tag !== 'latest'}
{#if index}, {/if}<a href="{path}?tag={tag}"><Tag id={tag} /></a> 
{/if}
{/each}
{/if}