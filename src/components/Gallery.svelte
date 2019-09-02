<script>
  import { createEventDispatcher } from 'svelte'
  import { fade, fly } from 'svelte/transition'

  import Picture from './Picture.svelte'

  export let images

  let selected = undefined
  const dispatch = createEventDispatcher()

  function enter(index) {
		selected = index
	}

	function leave() {
		selected = undefined
	}

  function pick(index) {
    dispatch('pick', index)
  }
</script>

<style>
  ol {
		list-style: none;
		margin: var(--gutter) 0;
		padding: 0;

		display: flex;
		justify-content: center;
		height: 100%;
	}

		ol > li {
			margin-right: calc(var(--gutter) / 4);

			flex: 1;
			transition: flex 333ms;
		}

		ol > li.selected {
			flex: 3;
		}

    ol > li:last-child {
			margin-right: 0;
		}

    figure :global(img) {
      height: 25vh;
      object-fit: cover;
    }

    figure {
      position: relative;
      margin: 0;
      cursor: pointer;
    }

    figure.content {
      margin-bottom: calc(var(--rythm) * 3);
      cursor: auto;
    }

      figcaption {
        position: absolute;
        left: 0;
        top: calc(100% + var(--rythm));
        width: 100vw;
      }

      figcaption :global(h6) {
        line-height: 2;
      }
</style>

<ol>
  {#each images as { thumbnail, content }, index}
  <li class:selected={selected === index} on:mouseenter={()=> enter(index)} on:click={() => pick(index)}>
    <figure class:content>
      <Picture media={thumbnail} small />
      {#if content && selected === index}
      <figcaption transition:fly>
        <slot name="content" {content} />
      </figcaption>
      {/if}
    </figure>
  </li>
  {/each}
</ol>