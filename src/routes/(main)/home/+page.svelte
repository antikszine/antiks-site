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
	let email = "";
	let message = "";

	onMount(() => {
		const index = new Date().getDate() % fortunes.length;
		dailyFortune = fortunes[index];
	});

    /// maybe we find a way to integrate with firebase??? 
	function subscribe() {
		if (!email || !email.includes("@")) {
			message = "invalid email. try again.";
			return;
		}
		message = "email received. you’re in the archive now.";
		email = "";
	}
</script>

<style>
	h1, p {
		font-family: "IBM Plex Mono", monospace;
		color: #000000;
		text-align: center;
	}

	a {
		color: rgb(223, 153, 255);
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}

	.form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	input {
		padding: 0.5rem 1rem;
		border-radius: 6px;
		border: 1px solid #333;
		background: #111;
		color: #eee;
		width: 220px;
		font-family: inherit;
	}

	input:focus {
		outline: none;
		border-color: #9cf;
	}

	button {
		padding: 0.5rem 1rem;
		border: 1px solid #333;
		border-radius: 6px;
		background: #151515;
		color: rgb(124, 196, 255);
		cursor: pointer;
		font-family: inherit;
		transition: 0.2s;
	}

	button:hover {
		background: #1a1a1a;
		border-color: #9cf;
	}

	.message {
		font-size: 0.9rem;
		color: #070707;
		margin-top: 0.25rem;
	}
</style>

<SignedOut>
	<h1>welcome, <a href="/login">sign in</a>.</h1>
	<p>{dailyFortune}</p>

	<div class="form">
		<input
			type="email"
			placeholder="enter your email"
			bind:value={email}
		/>
		<button on:click={subscribe}>join the mailing list</button>
		{#if message}
			<p class="message">{message}</p>
		{/if}
	</div>
</SignedOut>

<SignedIn>
	<h1>welcome, {$user?.displayName},</h1>
	<p>your signal has been etched into the archive.</p>
	<p>{dailyFortune}</p>

	<div class="form">
		<input
			type="email"
			placeholder="enter your signal (email)"
			bind:value={email}
		/>
		<button on:click={subscribe}>subscribe to the archive</button>
		{#if message}
			<p class="message">{message}</p>
		{/if}
	</div>
</SignedIn>
