<script lang="ts">
    import { auth } from '$lib/firebase';

	import type { PageProps } from './$types';

    import { userStore, SignedIn, SignedOut } from 'sveltefire';

	let { data }: PageProps = $props();
    let visible = $state(false);

    const user = userStore(auth);
</script>

<SignedOut>
    <h1>welcome, <a href="/login">sign in</a>.</h1>
</SignedOut>
<SignedIn>
    <h1>welcome, {$user?.displayName},</h1>
    <p>to the pinnacle of humanity.</p>
</SignedIn>

<style>
    * {
        text-align: center;
        font-family:'Comic Sans MS';
        color:#222222;
    }
</style>