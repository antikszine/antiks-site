<script lang="ts">
    import { auth, firestore } from '$lib/firebase';
    import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
    import { goto } from '$app/navigation';
    import { collection, doc, getDocs, setDoc, where, query } from 'firebase/firestore';

    const userMirror = collection(firestore,"user-mirror");
    let username = $state('');

    let email = $state('');
    let password = $state('');
    let passwordCheck = $state('');
    let userNameTaken = $state(false);
    let emailInUse = $state(false);

    async function displayNameSerialized(){
        let displayNameSerialized: string = '';
        const snapshot = await getDocs(query(userMirror, where("displayName", "==", username)));
        snapshot.forEach((doc) => {
            displayNameSerialized = doc.data().displayName as string;
            console.log(displayNameSerialized);
        });
        return displayNameSerialized;
    }

    const registerWithEmailAndPassword = async (email: string,password: string) => {
            try {
                if(await displayNameSerialized() == ''){
                    await createUserWithEmailAndPassword(auth, email, password)
                    .then((async (result) => {
                        updateProfile(result.user,{displayName: username});
                        setDoc(doc(firestore, "user-mirror", result.user.uid), {
                            displayName: result.user.displayName,
                            signature: `signed {user.displayName}`
                        });
                    }));
                    goto('/home');
                } else {
                    userNameTaken = true;
                }
                console.log('Successfully created user');
            } catch (error) {
                if (error instanceof Error && 'code' in error){
                    console.error('Registration error:', error.code as string);
                    if (error.code as string == 'auth/email-already-in-use'){
                        emailInUse = true;
                    }
                }
            }
        };
</script>

<form>
    <input placeholder="username" type="text" bind:value={username}/>
    <br>
    <input placeholder="email" type="text" bind:value={email}/>
    <br>
    <input placeholder="password" type="password" bind:value={password}/>
    <br>
    <input placeholder="confirm password" type="password" bind:value={passwordCheck}/>
    <br><br>
    {#if password != passwordCheck && password != ''}
        <p style="color:#FAA;">passwords do not match.</p>
        <button disabled>Sign Up!</button>
    {:else if password.length < 6 && password != ''}
        <p style="color:#FAA;">password should have more than 6 characters.</p>
        <button disabled>Sign Up!</button>
    {:else if username == '' || email == '' || password == ''}
        <button disabled>Sign Up!</button>
    {:else}
        <button onclick={() => {registerWithEmailAndPassword(email, password)}}>Sign Up!</button>
    {/if}
    {#if userNameTaken}
        <p style="color:#FAA">username taken</p>
    {/if}
    {#if emailInUse}
        <p style="color:#FAA">email already in use</p>
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
    p{
        text-align:center;
    }
</style>

<!-- 
###CANNOT ACCESS STORAGE UNTIL PLAN IS UPGRADED###

<FirebaseApp {auth} {firestore} {storage}>
{#if userImage}
    <UploadTask ref="{username}.png" data={userImage} let:progress let:snapshot>
        {#if snapshot?.state == "running"}
            {progress}% uploaded
        {/if}

        {#if snapshot?.state == "success"}
            done!
            <DownloadURL ref=snapshot?.ref let:link>
                <a href={link} download>Link</a>
            </DownloadURL>
        {/if}
    </UploadTask>
{/if}
</FirebaseApp> -->
