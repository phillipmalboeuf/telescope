<script>
  import { fade, fly } from 'svelte/transition'

  import Picture from './Picture.svelte'
  import Video from './Video.svelte'
  import Tag from './Tag.svelte'
  import Document from './document/index.svelte'

  export let items
  export let full = true

  items = items.map(item => ({
    ...item,
    type: item.type || item.sys.contentType.sys.id
  }))
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
      margin-top: 0;
      margin-bottom: calc(var(--rythm) * 3);
    }

    a.film.full {
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

      figure :global(video),
      figure :global(img) {
        height: calc(32.5vw * 14 / 9);
        object-fit: cover;
      }

      a.film figure {
        width: 52.5vw;
      }

      a.film figure :global(video),
      a.film figure :global(img) {
        height: calc(52.5vw * 9 / 14);
      }

      @media (max-width: 900px) {
        a,
        a.film {
          margin-top: 0;
          margin-bottom: calc(var(--gutter));
        }

        figure,
        a.film figure {
          width: 80vw;
        }

        figure :global(video),
        figure :global(img),
        a.film figure :global(video),
        a.film figure :global(img) {
          height: calc(80vw * 9 / 11);
        }
      }

      a.film.full figure {
        width: 100%;
      }

      a.film.full figure :global(video),
      a.film.full figure :global(img) {
        height: 100vh;
      }

      @media (max-width: 900px) {
        a.film.full {
          margin-top: calc(var(--gutter));
          margin-bottom: calc(var(--gutter));
        }

        a.film.full figure :global(video),
        a.film.full figure :global(img) {
          height: 42vh;
        }
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

      figcaption h4 {
        margin: 0;
      }

      @media (max-width: 900px) {
        figcaption h4 {
          font-size: var(--tiny);
        }
      }

      a.film.full figure figcaption {
        color: white;
        top: 0;
        right: var(--gutter);

        transition: transform 333ms;
        will-change: transform;
        transform: translateX(7vw);
      }

      @media (max-width: 900px) {
        a.film.full figure figcaption {
          right: calc(var(--gutter) * 2);
        }
      }

      li:nth-child(2n) figcaption {
        right: auto;
        left: 0;
        transform: rotate(180deg) translateX(-2px);
      }

      @media (max-width: 900px) {
        figcaption {
          right: calc(var(--gutter) * -1);
          transform: rotate(180deg);
        }

        li:nth-child(2n) figcaption {
          left: calc(var(--gutter) * -1);
          transform: rotate(180deg);
        }
      }

        a :global(img),
        a.film:not(.full) :global(video) {
          position: relative;
          z-index: 1;

          transition: transform 333ms;
          will-change: transform;
        }

        a:hover :global(img),
        a.film:not(.full):hover :global(video) {
          transform: translateX(-5vw);
        }

        li:nth-child(2n) a:hover :global(img),
        li:nth-child(2n) a.film:not(.full):hover :global(video) {
          transform: translateX(5vw);
        }

        a.film.full:hover figure figcaption {
          transform: translateX(0);
        }
</style>

<ol>
	{#each items as item, index (item.sys.id)}
  
	<li in:fly|local="{{ x: 200 * (index % 2 ? 1 : -1), delay: 666, duration: 666 }}" out:fly|local="{{ x: 200 * (index % 2 ? 1 : -1), duration: 666 }}">
    {#if item.type === 'looseText'}
    
    <Document body={item.fields.body} />

    {:else}
    <a class={item.type} class:full rel='prefetch' href='{item.type}s/{item.fields.identifier}'>
      <figure>
        {#if item.type === 'film'}
        {#if item.fields.teaser}
        <Video srcs={[item.fields.teaser]} poster={item.fields.poster} {full} />
        {:else}
        <Picture media={item.fields.poster} />
        {/if}
        {:else}
        <Picture media={item.fields.poster} />
        {/if}
        <figcaption>
          <h4>{item.fields.title} {#if item.fields.tags}• <Tag id={item.fields.tags[0]} />{/if}</h4>
        </figcaption>
      </figure>
    </a>
    {/if}
  </li>
	{/each}
</ol>