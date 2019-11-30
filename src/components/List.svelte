<script>
  import { fade, fly } from 'svelte/transition'
  import { onMount, tick } from 'svelte'

  import { stores } from '@sapper/app'
	const { session } = stores()

  import Picture from './Picture.svelte'
  import ListVideo from './ListVideo.svelte'
  import Tag from './Tag.svelte'
  import Document from './document/index.svelte'

  export let items
  export let full = true

  items = items.map(item => ({
    ...item,
    type: item.type || item.sys.contentType.sys.id
  }))

  let scrollY = 0
  let windowHeight
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
      cursor: default;
    }

      figure {
        position: relative;
        margin: 0 0 calc(var(--gutter) / 1.5);
      }

        li:last-child figure {
          margin-bottom: 0;
        }

      figure :global(video),
      figure :global(img) {
        height: calc(50vw - (var(--gutter) * 1.5));
        width: calc(50vw - (var(--gutter) * 1.5));
        object-fit: cover;
        object-position: center center;
        transition: width 420ms;
        
        position: relative;
        z-index: 1;
      }

      a.film figure :global(video),
      a.film figure :global(img) {
        width: 52.5vw;
        height: calc(52.5vw * 9 / 14);
      }

      a.film.full figure {
        margin: calc(var(--gutter) * 1.25) 0 var(--gutter);
      }

        li:first-child a.film.full figure {
          margin-top: 0;
        }

        li:last-child a.film.full figure {
          margin-bottom: 0;
        }

      a.film.full figure :global(video),
      a.film.full figure :global(img) {
        width: 100vw;
        height: 100vh;
        margin: calc(var(--gutter) * -1) 0 0 calc(var(--gutter) * -1);
      }

        figcaption {
          position: absolute;
          top: 0;
          left: 100%;
          width: 32.5vw;
          height: 100%;
          padding: 0 calc(var(--gutter) / 2) var(--gutter);
          transform: translateX(-100%);
          opacity: 0;

          transition: transform 420ms, opacity 420ms;
          will-change: transform;
        }

          figcaption h4 {
            margin: 0;
          }

          figcaption h6 {
            transform: translateX(-25%);

            transition: transform 420ms, font-variation-settings 333ms;
            will-change: transform;
          }

        li:nth-child(2n) figcaption {
          right: 100%;
          left: auto;
          transform: translateX(100%);
        }

          li:nth-child(2n) figcaption h6 {
            transform: translateX(25%);
          }

        @media (max-width: 900px) {
          figcaption,
          li:nth-child(2n) figcaption {
            transform: none;
            opacity: 1;
          }

          figcaption h6,
          li:nth-child(2n) figcaption h6 {
            transform: none;
          }
        }

        a.film.full figcaption {
          z-index: 2;
          opacity: 1;

          top: auto;
          bottom: calc(var(--gutter));
          left: 50%;
          right: auto;
          height: auto;
          width: auto;
          padding-bottom: 0;

          transform: translateX(-50%);
        }
          a.film.full figcaption > div {
            cursor: pointer;
            color: white;
            text-align: center;
            /* writing-mode: vertical-rl;

            transform: rotate(180deg); */
          }

          a.film.full figcaption h6 {
            margin-bottom: 0;
            margin-left: calc(var(--rythm) / 2);
            transform: none;
          }

      @media (hover: hover) {
        a:hover figcaption {
          transform: translateX(0);
          opacity: 1;
        }

          a:hover figcaption h6 {
            transform: translateX(0);
          }

        a:hover figure :global(video),
        a:hover figure :global(img) {
          width: calc(52.5vw - (var(--gutter) * 1.5));
        }

        a:hover :global(video:hover),
        a:hover :global(img:hover) {
          cursor: pointer;
        }

        a:hover :global(h6:hover),
        a:hover :global(h4:hover) {
          cursor: pointer;
          font-variation-settings: "wdth" 285;
        }

        a:hover :global(h6:hover) {
          font-variation-settings: "wdth" 235;
        }

        a.film:not(.full):hover figure :global(video),
        a.film:not(.full):hover figure :global(img) {
          width: 55vw;
        }

        a.film.full:hover figcaption {
          transform: translateX(-50%);
        }

          a.film.full:hover figcaption h6 {
            transform: none;
          }
      }
      
    li.loose {
      margin: 0 0 calc(var(--gutter) / 1.5);
    }
    
      li.loose :global(blockquote) {
        margin: 0;
      }
</style>

<svelte:window bind:scrollY={scrollY} bind:innerHeight={windowHeight} />

<ol>
	{#each items as item, index (item.sys.id)}
  
	<li in:fly|local="{{ x: 200 * (index % 2 ? 1 : -1), delay: 666, duration: 666 }}" out:fly|local="{{ x: 200 * (index % 2 ? 1 : -1), duration: 666 }}" class:loose={item.type === 'looseText'}>
    {#if item.type === 'looseText'}
    
    <Document body={item.fields.body} />

    {:else}
    <a class={item.type} class:full={!$session.isMobile && full} rel='prefetch' href='{item.type}s/{item.fields.identifier}'>
      <figure>
        {#if item.type === 'film'}
        {#if !$session.isMobile && item.fields.teaser}
        <ListVideo {scrollY} {windowHeight} src={item.fields.animationList || item.fields.teaser} />
        {:else}
        <Picture media={item.fields.poster} />
        {/if}
        {:else}
        <Picture media={item.fields.poster} />
        {/if}
        <figcaption>
          <div>
            {#if item.fields.tags}<h6><Tag id={item.fields.tags[0]} /></h6>{/if}
            <h4>{item.fields.title}</h4>
          </div>
        </figcaption>
      </figure>
    </a>
    {/if}
  </li>
  {:else}
  <h6><em>{$session.locale === 'fr-CA' ? 'Aucun résultats.' : 'No results.'}</em></h6>
	{/each}
</ol>