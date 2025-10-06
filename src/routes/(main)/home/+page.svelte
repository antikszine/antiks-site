<script lang="ts">
    import { auth } from '$lib/firebase';

    import { userStore, SignedIn, SignedOut } from 'sveltefire';

    const user = userStore(auth);
</script>

<SignedOut>
    <h1>welcome, <a href="/login">sign in</a>.</h1>
</SignedOut>
<SignedIn>
    <h1>welcome, {$user?.displayName},</h1>
    <img src={$user?.photoURL} alt="{$user?.displayName}'s profile image"/>
    <p>your signal has been etched into the archive.</p>
</SignedIn>
