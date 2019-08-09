<script>
  import Picture from './Picture.svelte'
  import Tag from './Tag.svelte'

  export let items
  export let path
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
    }

      figure {
        position: relative;
        margin: -15vh 0 0;
        width: 32.5vw;
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
    <a rel='prefetch' href='/{path}/{item.fields.identifier}'>
      <figure>
        <Picture media={item.fields.poster} />
        <figcaption>
          <h4>{item.fields.title} {#if item.fields.tags}• <Tag id={item.fields.tags[0]} />{/if}</h4>
        </figcaption>
      </figure>
    </a>
  </li>
	{/each}
</ol>