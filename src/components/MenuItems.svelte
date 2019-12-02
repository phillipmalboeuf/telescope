<script>
  import NewsletterForm from './NewsletterForm.svelte'
  import Tags from './Tags.svelte'
	export let items
  export let all
</script>

<style>
ol {
  position: absolute;
  top: var(--gutter);
  right: calc(var(--gutter) * 2.75);
  width: calc(var(--gutter) * 5.5);

  list-style: none;
}

  ol > li {
    margin-bottom: calc(var(--rythm) * 2);
  }

  a.disabled {
    pointer-events: none;
    text-decoration: line-through;
  }
</style>


<ol>
{#if all}
<li>
  <a rel=prefetch href={all.path} on:click>
    <h4>{all.title}</h4>
  </a>
</li>
{/if}
{#if items}
{#each items as item}
<li>
  {#if item.type === 'contact'}
  <a href={item.fields.link} target="_blank">
    <h4>{item.fields.title}</h4>
    <h6>{item.fields.linkLabel}</h6>
  </a>
  {:else if item.type === 'newsletter'}
  <NewsletterForm id="menu-newsletter-form" />
  {:else if item.type === 'locales'}
  <h4>
    <a rel=prefetch href="{item.path}" class:disabled={item.current === 'fr-CA'}>Français</a><br />
    <a rel=prefetch href="/en{item.path}" class:disabled={item.current === 'en-US'}>English</a>
  </h4>
  <h6>Languages • Langues</h6>
  {:else}
  <a rel=prefetch href={item.type === 'about'
    ? `${item.type}#${item.fields.identifier}`
    : `${item.type}s/${item.fields.identifier}`} on:click>
    <h4>{item.fields.title}</h4>
  </a>
  <h6><Tags tags={item.fields.tags} path={`${item.type}s`} />{#if item.fields.ralisateur}&nbsp;• {item.fields.ralisateur}{/if}</h6>
  {/if}
</li>
{/each}
{/if}
</ol>