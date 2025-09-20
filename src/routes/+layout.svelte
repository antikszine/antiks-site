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

{@render children?.()}



