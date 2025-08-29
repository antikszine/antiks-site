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
		<a href="/" class="brand">michael</a>

		<!-- Center links -->
		<div class="nav-links">
			<a href="/">Home</a>
			<a href="/forum">Forum</a>
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

<style>
/* Background stripes like old forums */
:global(body) {
	margin: 0;
	font-family: 'Comic Sans MS', sans-serif;
	background: repeating-linear-gradient(
		45deg,
		#e0e0e0,
		#e0e0e0 20px,
		#f8f8f8 20px,
		#f8f8f8 40px
	);
	color: #222;
}

/* Navbar container */
.navbar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #2a2a40; /* dark purple/blue */
	padding: 0.75rem 1.5rem;
}

/* Brand/home link */
.navbar .brand {
	font-weight: bold;
	font-size: 1.2rem;
	color: #ffd369; /* retro accent */
	text-decoration: none;
}

/* Center links */
.nav-links {
	display: flex;
	gap: 0.75rem;
}
.navbar a {
	color: #fff;
	text-decoration: none;
	padding: 0.4rem 0.6rem;
	border-radius: 6px;
	transition: background 0.2s ease, color 0.2s ease;
}
.navbar a:hover {
	background: #444466;
}

/* Right side container */
.nav-right {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

/* Signup link stands out */
.signup {
	background: #ffd369;
	color: #000 !important;
	font-weight: bold;
}
.signup:hover {
	background: #ffbf00;
}

/* Sign out button styled like link */
.signout {
	background: transparent;
	border: 1px solid #fff;
	color: #fff;
	padding: 0.3rem 0.7rem;
	border-radius: 6px;
	cursor: pointer;
	transition: background 0.2s ease, color 0.2s ease;
}
.signout:hover {
	background: #fff;
	color: #2a2a40;
}

/* Page container */
.page-container {
	display: flex;
	justify-content: center;
	padding: 2rem;
}

/* Content box (centered forum-style) */
.content-box {
	background: #fff;
	border: 2px solid #999;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	width: 100%;
	max-width: 960px; /* forum width */
	padding: 2rem;
}
</style>
