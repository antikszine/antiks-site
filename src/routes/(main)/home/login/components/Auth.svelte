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
        goto('/home');

        } catch (error) {
            console.error('Sign in error:', error)
        }
    };
</script>
<form>
    <input placeholder="email" type="text" bind:value={email}/>
    <br>
    <input placeholder="password" type="password" bind:value={password}/>
    <br>
    <button onclick={() => {loginWithEmailPassword(email, password)}}>Sign In</button>
</form>

<style>
    form{
        display:flex;
        flex-direction: column;
        align-items: center;
        width:fit-content;
    }
    input{
        margin-bottom:8px;
    }
    button{
        width:fit-content;
    }
</style>