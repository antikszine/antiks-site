<script lang="ts">
	import { auth } from '$lib/firebase';
	import { userStore, SignedIn, SignedOut } from 'sveltefire';
	import { onMount } from 'svelte';

	const user = userStore(auth);

	// daily fortunes
	const fortunes = [
		"Luck flows in your favor today.",
		"A new light flickers: listen carefully, it’s meant for you.",
		"Today feels heavier in the air, but your relief waits at dusk.",
		"Your resonance is strong. What you seek may echo back.",
		"The world smiles faintly upon you today.",
		"Expect small miracles hidden in routine."
	];

	let dailyFortune = "";

	onMount(() => {
		const index = new Date().getDate() % fortunes.length;
		dailyFortune = fortunes[index];
	});
</script>

<SignedOut>
	<main>
		<div>
			<h1>welcome, <a href="/login">sign in</a>.</h1>
			<p>{dailyFortune}</p>
			<p>not part of the archive? <a href="./home/register">immortalize yourself.</a></p>
		</div>
	</main>
</SignedOut>

<SignedIn>
	<main>
		<div>
			<h1>welcome, {$user?.displayName},</h1>
			<p>your signal has been etched into the archive.</p>
			<p>{dailyFortune}</p>
		</div>
	</main>
</SignedIn>

<style>
	main {
		min-height: 95vh;
		display:grid;
		place-items: center;
	}
	h1, p {
		font-family: "IBM Plex Mono", monospace;
		color: #000000;
		text-align: center;
	}
	a {
		color: #ff4081;
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}
</style>