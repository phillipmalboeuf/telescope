<script context="module">
	export async function preload({ params, query }) {
		const res = await this.fetch(`news/${params.identifier}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { article: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	export let article;
</script>

<style>
</style>

<svelte:head>
	<title>{article.fields.title}</title>
</svelte:head>

<h1>{article.fields.title}</h1>

<div class='content'>
	{JSON.stringify(article.fields.body)}
</div>
