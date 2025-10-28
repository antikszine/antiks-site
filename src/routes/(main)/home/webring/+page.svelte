<script lang="ts">
	export let data;
	let { webring } = data;

	let current = 0;

	function next() {
		current = (current + 1) % webring.length;
	}
	function prev() {
		current = (current - 1 + webring.length) % webring.length;
	}
	function random() {
		current = Math.floor(Math.random() * webring.length);
	}
</script>

<section class="webring">
	<h1>midge's webring</h1>

	<div class="ring">
		<h2>{webring[current].name}</h2>
		<p>{webring[current].desc}</p>

		<a href={webring[current].url} target="_blank" rel="noopener noreferrer">
			visit site →
		</a>
	</div>

	<nav class="controls">
		<button on:click={prev}>← prev</button>
		<button on:click={random}>🎲 random</button>
		<button on:click={next}>next →</button>
	</nav>
</section>

<style>
	.webring {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 3rem 1rem;
		min-height: 100vh;
		font-family: "IBM Plex Mono", monospace;
		background: #fafafa;
		color: #111;
	}

	h1 {
		font-size: 1.8rem;
		margin-bottom: 2rem;
	}

	.ring {
		padding: 2rem;
		max-width: 400px;
		border-radius: 12px;
		max-width: 400px;
	}

	a {
		display: inline-block;
		margin-top: 1rem;
		color: #ff4081;
		text-decoration: none;
	}

	.controls {
		display: flex;
		gap: 1rem;
		margin-top: 2rem;
	}

	button {
		background: #222;
		color: #fff;
		border: none;
		border-radius: 8px;
		padding: 0.5rem 1rem;
		cursor: pointer;
		font-family: inherit;
		transition: background 0.2s ease;
	}

	button:hover {
		background: #444;
	}

	@media (max-width: 600px) {
		.ring {
			width: 90%;
		}
	}
</style>
