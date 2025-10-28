<script lang="ts">
	export let data;
	const { aboutText } = data;

	// Split text into paragraphs at double line breaks
	const paragraphs = aboutText.split(/\n\s*\n/);
</script>

<section class="about-page">
	<h1><strong>antikszine manifesto</strong></h1>

	{#each paragraphs as para}
		<p>{para}</p>
	{/each}

	<h2>signed, <br>antikszine <br><br>10.13.25</h2>
</section>

<style>
	.about-page {
		max-width: 800px;
		margin: 3rem auto;
		background: #fff;
		border-radius: 12px;
		font-family: 'Inconsolata', monospace;
		color: #222;
	}

	h1 {
		font-size: 2rem;
		margin-bottom: 1.5rem;
		font-style: oblique;
	}

	p {
		font-size: 1.1rem;
		margin-bottom: 1.25rem;
		line-height: 1.6;
	}

	h2 {
		margin-top: 2rem;
		font-size: 1.5rem;
		margin-bottom: 1rem;
		line-height: 30px;
	}
</style>
