<script lang="ts">
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
	<!-- Navbar -->
	<nav class="navbar">
		<!-- Brand -->
		<a href="/landingpage" class="brand">antiks</a>

		<!-- Center links -->
		<div class="nav-links">
			<a href="/">about</a>
			<a href="/forum">forum</a>
			<a href="/forum">stockpile</a>
		</div>

		<!-- Auth -->
		<div class="nav-right">
			<SignedOut>
				<a href="/login">Sign In</a>
				<a href="/register" class="signup">Sign Up</a>
			</SignedOut>
			<SignedIn>
				<a href="/profile">Profile</a>
				<button class="signout" onclick={() => signOut(auth)}>Sign Out</button>
			</SignedIn>
		</div>
	</nav>

	<!-- Page container -->
	<div class="page-container">
		<main class="content-box">
			{@render children?.()}
		</main>
	</div>
</FirebaseApp>


