<script>
  import NewsletterForm from './NewsletterForm.svelte'
	export let items
</script>

<style>
ol {
  position: absolute;
  top: var(--gutter);
  right: calc(var(--gutter) * 2.5);
  width: calc(var(--gutter) * 4.5);

  list-style: none;
}

  ol > li {
    margin-bottom: calc(var(--rythm) * 2);
  }
</style>


<ol>
{#if items}
{#each items as item}
<li>
  {#if item.type === 'contact'}
  <a href={item.fields.link} target="_blank">
    <h4>{item.fields.title}</h4>
    <h6>{item.fields.linkLabel}</h6>
  </a>
  {:else if item.type === 'newsletter'}
  <NewsletterForm />
  {:else}
  <a rel=prefetch href={item.type === 'about'
    ? `/${item.type}#${item.fields.identifier}`
    : `/${item.type}s/${item.fields.identifier}`} on:click>
    <h4>{item.fields.title}</h4>
    <h6>{item.fields.tags}</h6>
  </a>
  {/if}
</li>
{/each}
{/if}
</ol>