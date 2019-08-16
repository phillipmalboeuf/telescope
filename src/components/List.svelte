<script>
  import Picture from './Picture.svelte'
  import Video from './Video.svelte'
  import Tag from './Tag.svelte'

  export let items
</script>

<style>
  ol {
    list-style: none;
    padding: 0;
    margin: 0;
  }

    li:nth-child(2n) {
      text-align: right;
    }

    a {
      display: inline-block;
      margin-top: calc(var(--gutter) * -2);
    }

    a.film {
      margin-top: calc(var(--gutter) * 2);
      margin-bottom: calc(var(--gutter) * 3);
    }

    li:first-child a {
      margin-top: 0;
    }

      figure {
        position: relative;
        margin: 0;
        width: 32.5vw;
      }

      a.film figure {
        width: 100%;
      }

      li:first-child figure {
        margin-top: 0;
      }

      figcaption {
        position: absolute;
        top: 0;
        right: 0;

        writing-mode: vertical-rl;
				transform: rotate(180deg) translateX(2px);
				white-space: nowrap;
      }

      a.film figure figcaption {
        color: white;
        top: 0;
        right: var(--gutter);
      }

      li:nth-child(2n) figcaption {
        right: auto;
        left: 0;
        transform: rotate(180deg) translateX(-2px);
      }

        a :global(img) {
          position: relative;
          z-index: 1;

          transition: transform 333ms;
          will-change: transform;
        }

        a:hover :global(img) {
          transform: translateX(-5vw);
        }

        li:nth-child(2n) a:hover :global(img) {
          transform: translateX(5vw);
        }
</style>

<ol>
	{#each items as item}
	<li>
    <a class={item.type} rel='prefetch' href='/{item.type}s/{item.fields.identifier}'>
      <figure>
        {#if item.type === 'film'}
        <Video poster={item.fields.poster} />
        {:else}
        <Picture media={item.fields.poster} />
        {/if}
        <figcaption>
          <h4>{item.fields.title} {#if item.fields.tags}• <Tag id={item.fields.tags[0]} />{/if}</h4>
        </figcaption>
      </figure>
    </a>
  </li>
	{/each}
</ol>