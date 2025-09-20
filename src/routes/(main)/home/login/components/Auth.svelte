<script lang="ts">
    import { auth } from '$lib/firebase';
    import { signInWithEmailAndPassword } from 'firebase/auth';
    import { goto } from '$app/navigation';

    let email = $state('');
    let password = $state('');

    const loginWithEmailPassword = async (email: string,password: string) => {
        try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('Signed in user:', user.displayName);
        goto('/');

        } catch (error) {
            console.error('Sign in error:', error)
        }
    };
</script>

<form style="width:50%; margin:0;">
    <input placeholder="email" type="text" bind:value={email}/>
    <br>
    <input placeholder="password" type="password" bind:value={password}/>
    <br>
    <button onclick={() => {loginWithEmailPassword(email, password)}}>AHHHHH</button>
</form>