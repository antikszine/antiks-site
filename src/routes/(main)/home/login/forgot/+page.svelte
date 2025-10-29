<script lang="ts">
    import { auth, firestore } from "$lib/firebase";
    import { onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
    import { doc, setDoc } from "firebase/firestore";

    let providedEmail = $state('');
    let message = $state('');
    let color = $state('');

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            await setDoc(doc(firestore, "user-mirror", user.uid), {
                displayName: user.displayName,
                UID: user.uid
            });
        }
    })

    async function emailCheck(){
            console.log('button pressed')
            try{
                await sendPasswordResetEmail(auth, providedEmail);
                color = "green";
                message = 'if an account is associated with this email, a reset link has been sent. remember to check your spam folder!';
            } catch (error: unknown){
                if (error instanceof Error && "code" in error){
                    console.log(error.code);
                    color = "red";
                    message = error.code as string;
                }
            } 
    }
</script>

<h1>has your flesh archive failed you?</h1>
<input placeholder="email" bind:value={providedEmail}/>
<button onclick={() => emailCheck()}>Submit</button>
{#if message != ''}
<p style="color:{color}">{message}</p>
{/if}