<script lang="ts">
    import { auth, firestore } from '$lib/firebase';
    import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
    import { goto } from '$app/navigation';
    import { doc, setDoc } from 'firebase/firestore';

    let email = $state('');
    let password = $state('');
    let errorMessage = $state('');

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            await setDoc(doc(firestore, "user-mirror", user.uid), {
                displayName: user.displayName,
            });
        }
    });

    const loginWithEmailPassword = async (email: string,password: string) => {
        try {
            errorMessage = '';
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('Signed in user:', user.displayName);
            goto('/home');

        } catch (error) {
            if (error instanceof Error && "code" in error){
                console.error('Sign in error:', error.code);
                switch(error.code){
                    case 'auth/invalid-email':
                        errorMessage = 'please enter a valid email';
                        break;
                    case 'auth/missing-password':
                        errorMessage = 'please enter your password';
                        break;
                    case 'auth/invalid-login-credentials':
                        errorMessage = 'email and password do not match';
                        break;
                }
            }
        }
    };
</script>
<form>
    <input placeholder="email" type="text" bind:value={email}/>
    <br>
    <input placeholder="password" type="password" bind:value={password}/>
    <br>
    <button onclick={() => {loginWithEmailPassword(email, password)}}>Sign In</button>
    {#if errorMessage != ''}
    <p style="color:red">{errorMessage}</p>
    {/if}
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