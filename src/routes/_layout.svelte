<script>
	import Menu from '../components/Menu.svelte';

	export let segment;
</script>

<style>
	:global(*) {
    box-sizing: border-box;
  }

	:global(:root) {
    --rythm: 20px;
		--gutter: 5vw;

    --big: 6.5vw;
    --medium: 19pt;
    --small: 12pt;
    --tiny: 7pt;
    --body: 15pt;
  }

  @media (min-width: 1500px) {
    :global(:root) {
      --tiny: 8pt;
    }
  }

  @media (max-width: 900px) {
    :global(:root) {
      --gutter: 6.5vw;

      --big: 8vw;
      --medium: 12pt;
      --small: 9pt;
      --tiny: 6pt;
      --body: 12pt;
    }
  }

	:global(html) {
    background-color: black;
  }

	:global(body) {
		font-family: system-ui, -apple-system;
    font-size: 20px;
    line-height: 1.333;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

		color: black;
		background: white;

		margin: 0;
    overflow-x: hidden;
	}

	main {
		/* min-height: 100vh; */
		padding: var(--gutter);
	}

	:global(h1, h2, h3, h4, h5, h6, p) {
    margin: 0 0 var(--rythm);
    /* white-space: pre-line; */
  }

	:global(h1, h2, h3, h4, h5, h6, blockquote) {
    font-family: 'Telescopique', system-ui, -apple-system;
    font-weight: normal;
    font-variation-settings: "wdth" 200;
		text-transform: uppercase;
    line-height: 1.2;
    transition: font-variation-settings 333ms;
  }

	:global(h4, h5, h6) {
    font-variation-settings: "wdth" 250;
    margin-bottom: calc(var(--rythm)/2);
  }

  @media (max-width: 900px) {
    :global(h1, h2, h3, h4, h5, h6, p) {
      margin-bottom: calc(var(--rythm)/2);
    }

    :global(h4, h5, h6) {
      margin-bottom: calc(var(--rythm)/4);
    }
  }

  :global(h1, blockquote p) {
    font-size: var(--big);
  }

  :global(h2) {
    font-size: var(--medium);
  }

  :global(h4) {
    font-size: var(--small);
  }

  :global(h6) {
    font-size: var(--tiny);
    font-variation-settings: "wdth" 200;
  }

  @media (hover: hover) {
    :global(h1 a:hover, h2 a:hover, h3 a:hover) {
      font-variation-settings: "wdth" 235;
    }

    :global(h4 a:hover, h5 a:hover, h6 a:hover) {
      font-variation-settings: "wdth" 285;
    }

    :global(blockquote a:hover) {
      font-variation-settings: "wdth" 285;
    }

    :global(h6 a:hover) {
      font-variation-settings: "wdth" 225;
    }
  }

  :global(p) {
    font-size: var(--body);
  }

	:global(p:last-child) {
    margin-bottom: 0;
  }

	:global(p + h1, p + h2, p + h4,
		ul + h1, ul + h2, ul + h4,
		ol + h1, ol + h2, ol + h4) {
    margin-top: calc(var(--rythm)*2);
  }

  :global(blockquote) {
    white-space: pre-line;
    margin: var(--gutter) 0;
  }

	:global(small) {
    font-size: calc(var(--rythm)/1.333);
    line-height: calc(var(--rythm)/1.333);
  }

	:global(ul, ol) {
    margin: 0 0 var(--rythm);
    padding-left: var(--rythm);
  }

  :global(hr) {
    display: inline-block;
    border: none;
    margin: calc(var(--rythm) / 2) 0;
  }

  :global(iframe) {
    max-width: 100%;
    margin: calc(var(--rythm)) 0;
    border: none;
    background: black;
  }

	:global(a, button, input) {
    outline: none;
    cursor: pointer;
    color: inherit;
    text-decoration: none;
    position: relative;
    border: none;
    background: transparent;
    transition: font-variation-settings 333ms, opacity 333ms;
  }

  /* :global(a:active, button:active) {
    top: 1px;
  } */

  :global(button, label, input) {
    font-family: 'Telescopique', system-ui, -apple-system;
    font-size: var(--small);
    font-variation-settings: "wdth" 200;
    transition: font-variation-settings 333ms;
  }

  :global(button:hover, input:focus) {
    font-variation-settings: "wdth" 235;
  }
</style>

<main>
	<slot></slot>
</main>

<Menu {segment} />