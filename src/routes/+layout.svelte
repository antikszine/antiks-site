<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';

	import { auth } from '$lib/firebase';
	import { firestore } from '$lib/firebase';

	import { FirebaseApp, SignedIn, SignedOut } from 'sveltefire';
    import { signOut } from 'firebase/auth';

	let { children } = $props();

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{page.data.post.title}</title>
</svelte:head>

<FirebaseApp {auth} {firestore}>
	<nav style="text-align:center; font-family:'Comic Sans MS';">
		<a href="./">Home</a> | <a href="/forum">Forum</a> 
		<SignedOut>
			| <a href="/login">Sign In</a>/<a href="/register">Sign Up</a>
		</SignedOut>
		<SignedIn>
			| <a href="/profile">Profile</a>
			<br>
			<button onclick={() => {signOut(auth)}}>Sign Out</button>
		</SignedIn>
	</nav>
	{@render children?.()}
</FirebaseApp>

<style>
/* Navbar container */
.navbar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #2a2a40; /* dark purple/blue */
	padding: 0.75rem 1.5rem;
	font-family: 'Comic Sans MS', sans-serif;
}

/* Links shared styles */
.navbar a {
	color: #fff;
	text-decoration: none;
	margin: 0 0.5rem;
	padding: 0.4rem 0.6rem;
	border-radius: 6px;
	transition: background 0.2s ease, color 0.2s ease;
}

/* Hover effect */
.navbar a:hover {
	background: #444466;
}

/* Brand/home link */
.navbar .brand {
	font-weight: bold;
	font-size: 1.2rem;
	color: #ffd369; /* a bright accent */
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
</style>