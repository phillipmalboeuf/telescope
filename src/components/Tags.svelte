<script>
	import Tag from './Tag.svelte'
  export let tags
	export let path
	export let all = undefined
	export let currentTag = undefined
	export let nav = false
</script>

<style>
	nav {
		display: flex;
		flex-wrap: wrap;
		margin: calc(var(--rythm) * -2.5) 0 calc(var(--rythm) * 1) calc(var(--rythm) / -2);
	}

		nav a {
			opacity: 0.35;
			padding: calc(var(--rythm) / 2);
		}

		nav a.current {
			opacity: 1;
		}
		
	@media (max-width: 900px) {
		nav {
			margin-top: calc(var(--rythm) * -0.5);
		}
	}
</style>

{#if nav}
<nav>
	<a href="" rel=prefetch><h6>Telescope</h6></a>
	<a href="{path}" rel=prefetch class:current={currentTag === undefined}><h6>{all}</h6></a>
	{#each tags as [tag, total] (tag)}
	{#if tag !== 'recent' && tag.indexOf('20') !== 0}
	<a href="{path}?tag={tag}" rel=prefetch class:current={tag === currentTag}><h6><Tag id={tag} /></h6></a> 
	{/if}
	{/each}
</nav>
{:else}
{#each tags as tag, index (tag)}
{#if tag !== 'recent'}
{#if index}&nbsp;• {/if}<a href="{path}?tag={tag}"><Tag id={tag} /></a> 
{/if}
{/each}
{/if}