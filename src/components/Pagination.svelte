<script>
  export let path
	export let currentPage
  export let numberOfPages

	import { stores } from '@sapper/app'
	const { session } = stores()
</script>

<style>
	nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
    margin-top: calc(var(--rythm) * 2);
	}

		nav a {
			font-family: 'Telescopique', system-ui, -apple-system;
			font-variation-settings: "wdth" 200;
			font-size: var(--tiny);
      cursor: pointer;
      display: inline-block;
			padding: calc(var(--rythm) / 2);
      /* border: 2px solid black; */
      /* margin-right: calc(var(--rythm) / 3); */
		}

      nav a:hover,
      nav a:focus {
        opacity: 1;
				font-variation-settings: "wdth" 325;
      }

		nav a.current {
			font-variation-settings: "wdth" 800;
		}

  /* @media (max-width: 1200px) {
		nav {
			margin-top: calc(var(--rythm) * -1.5);
		}
	}
		
	@media (max-width: 900px) {
		nav {
			margin-top: calc(var(--rythm) * -0.5);
		}
	} */
</style>

<nav>
	{#if currentPage > 0}
	<a href="{path}?p={currentPage - 1}">{$session.locale === 'fr-CA' ? '« Précédent' : '« Prev'}</a>
	{/if}

	{#each Array.from(Array(numberOfPages)) as _, index}
  <a href="{path}?p={index}" class:current={index === currentPage}>{index+1}</a>
  {/each}

	{#if currentPage < numberOfPages - 1}
	<a href="{path}?p={currentPage + 1}">{$session.locale === 'fr-CA' ? 'Suivant »' : 'Next »'}</a>
	{/if}
</nav>
