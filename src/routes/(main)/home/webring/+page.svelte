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

	// Import constituents from the same folder
	import constituents from './constituents';
</script>

<!--
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
-->

<!-- Constituents grid section -->
<section class="constituents">
	<h2>constituents</h2>
	<div class="grid">
		{#each constituents as c}
			<a
				class="box"
				href={c.url || '#'}
				target={c.url ? '_blank' : undefined}
				rel={c.url ? 'noopener noreferrer' : undefined}
			>
				<h3>{c.name}</h3>
				{#if c.occupations?.length}
					<p>{c.occupations.join(' / ')}</p>
				{/if}
				<!--instagram is made by meta, who does not respect privacy in the same way a person's website would, so sending the privacy-conscious user there should be disclosed-->
				{#if (c.url?.includes("instagram"))}
					<p>instagram linked</p>
				{/if}
				{#if c.type}
					<span class="tag">{c.type}</span>
				{/if}
			</a>
		{/each}
	</div>
</section>

<style>
	/* Updated webring styles */
	.webring {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 2rem 1rem; /* reduced padding */
		/* min-height removed so grid appears just below */
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

	/* Constituents grid styles */
	.constituents {
		padding: 2rem 1rem 4rem;
		font-family: "IBM Plex Mono", monospace;
		color: #111;
		background: #fafafa;
		text-align: center;
		border-top: 1px solid #ddd;
	}

	.constituents h2 {
		font-size: 1.4rem;
		margin-bottom: 1.5rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
		gap: 0.75rem;
		max-width: 900px;
		margin: 0 auto;
	}

	.box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border: 1px solid #ddd;
		background: #fff;
		border-radius: 8px;
		padding: 1rem;
		text-decoration: none;
		color: inherit;
		transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
	}

	.box:hover {
		background: #f3f3f3;
		transform: translateY(-3px);
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
	}

	.box h3 {
		margin: 0;
		font-size: 1rem;
		font-weight: 600;
	}

	.box p {
		margin: 0.3rem 0 0;
		font-size: 0.8rem;
		color: #555;
	}

	.tag {
		margin-top: 0.5rem;
		font-size: 0.7rem;
		padding: 0.15rem 0.4rem;
		border: 1px solid #ccc;
		border-radius: 999px;
		color: #444;
	}

	@media (max-width: 600px) {
		.grid {
			grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		}
	}
</style>
