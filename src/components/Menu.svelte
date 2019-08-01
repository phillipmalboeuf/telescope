<script>
	import { stores } from '@sapper/app';
	const { preloading, page, session } = stores();

	export let segment;
	let { films } = $session.navigation
</script>

<style>
	nav {
		position: fixed;
		top: 0;
		right: 0;
	}

	.selected {
		font-weight: bold;
	}

	a {
		display: inline-block;
	}
</style>

<nav>
	<ul>
		<li><a href='/'>Latest</a></li>
		<li>
			<a href='/films'>Films</a>
			<ul>
				{#each films.items as film}
				<li><a rel=prefetch href='/films/{film.fields.identifier}'>{film.fields.title}</a></li>
				{/each}
			</ul>
		</li>
	</ul>
</nav>