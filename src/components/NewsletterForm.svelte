<script>
	import { onMount } from 'svelte'

	onMount(() => {
		window.sk = window.sk||function(){(sk.q=sk.q||[]).push(arguments)}
		sk('form', '.newsletter-form', {
			id: 'b98ecb61f446'
		})
	})
</script>

<style>
  label {
    display: block;
    margin-bottom: calc(var(--rythm) / 4);
  }

  input {
    font-size: 10pt;
    border: none;
    border-bottom: 1px solid transparent;
    background: transparent;
  }

  button {
    border: none;
    background: transparent;
  }
</style>

<form class="newsletter-form">
  <label for="email">Newsletter Subscription</label>
  <input id="email" type="email" name="email" value="" placeholder="Enter your email here" />
  <button type="submit">→</button>
</form>
