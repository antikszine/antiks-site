<script lang="ts">
	import Mascot from '$lib/components/mascot.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';

	import { auth, firestore, storage } from '$lib/firebase';
	import { FirebaseApp, SignedIn, SignedOut } from 'sveltefire';
	import { signOut } from 'firebase/auth';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{page?.data?.post?.title || 'michael'}</title>
</svelte:head>

<FirebaseApp {auth} {firestore} {storage}>
	<div class="layout">

		<aside class="sidebar">
			<a href="/home">antikszine</a>

			<nav class="links">
				<a href="/home/about">manifesto</a>
				<a href="/home/digest">digest</a>
				<a href="/home/forum">forum</a>
				<a href="/home/stockpile">stockpile (works)</a>
				<a href="/home/resources">resources (links)</a>
				<a href="/home/webring">webring</a>
			</nav>

			<div class="auth">
				<SignedOut>
					<a href="/home/login">Sign In</a>
					<a href="/home/register">Sign Up</a>
				</SignedOut>
				<SignedIn>
					<a href="/home/profile">Profile</a>
					<button onclick={() => signOut(auth)}>Sign Out</button>
				</SignedIn>
			</div>
		</aside>

		<main class="content">
			{@render children?.()}
		</main>
		<Mascot imgSrc="/sketchyminerva1.png" />
	</div>
</FirebaseApp>

<style>
	@font-face {
		font-family: "Inconsolata";
		src: url("/fonts/Inconsolata-VariableFont_wdth,wght.ttf") format("truetype");
		font-weight: normal;
		font-style: normal;
	}

	.layout {
		display: flex;
		min-height: 100vh;
		font-family: "Inconsolata", monospace;
	}

	.sidebar {
		width: 200px;
		background: #ffffff;
		color: #000000;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		font-family: "Inconsolata", monospace;
	}

	.brand {
		color: #e692ff;
		font-weight: 600;
		text-decoration: none;
		font-size: 1.1rem;
	}

	.links,
	.auth {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.sidebar a,
	.sidebar button {
		color: #000000;
		text-decoration: none;
		background: none;
		border: none;
		cursor: pointer;
		font-size: 0.95rem;
		text-align: left;
		font-family: "CourierPixel", monospace;
	}

	.sidebar a:hover,
	.sidebar button:hover {
		color: #ff4081;
	}

	.content {
		flex: 1;
		padding: 1.5rem;
		background: #fafafa;
		color: #111;
		overflow-y: auto;
		font-family: "CourierPixel", monospace;
	}
 </style>


