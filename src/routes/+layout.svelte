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
    :global(h1,h2,h3,h4,h5,h6,p) {
        text-align: center;
        font-family:'Comic Sans MS';
        color:#222222;
    }
</style>