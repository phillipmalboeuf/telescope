<script>
  export let path
	export let currentPage
  export let numberOfPages
</script>

<style>
	nav {
		display: flex;
		flex-wrap: wrap;
    margin-top: calc(var(--rythm));
	}

		nav a {
      cursor: pointer;
      display: inline-block;
			padding: calc(var(--rythm) / 2) calc(var(--rythm));
      border: 2px solid black;
      margin-right: calc(var(--rythm) / 3);
		}

      nav a:hover,
      nav a:focus {
        opacity: 1;
      }

		nav a.current {
			color: white;
      background: black;
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
	{#each Array.from(Array(numberOfPages)) as _, index}
    <a href="{path}?p={index}" class:current={index === currentPage}>{index+1}</a>
  {/each}
</nav>
