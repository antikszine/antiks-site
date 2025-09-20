<script lang="ts">
    import { auth, firestore, storage } from '$lib/firebase';
    import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
    import { goto } from '$app/navigation';
    // import { FirebaseApp, UploadTask, DownloadURL } from 'sveltefire';

    let username = $state('');

    let email = $state('');
    let password = $state('');
    let passwordCheck = $state('');

    // let userImage: File = $state() as File;

    const registerWithEmailAndPassword = async (email: string,password: string) => {
            try {
                await createUserWithEmailAndPassword(auth, email, password)
                .then((result => {return updateProfile(result.user,{displayName: username})}))
                goto('/');
                console.log('Successfully created user');
            } catch (error) {
                console.error('Registration error:', error);
            }
        };
</script>

<form style="width:50%; margin:0;">
    <input placeholder="username" type="text" bind:value={username}/>
    <br>
    <input placeholder="email" type="text" bind:value={email}/>
    <br>
    <input placeholder="password" type="password" bind:value={password}/>
    <br>
    <input placeholder="confirm password" type="password" bind:value={passwordCheck}/>
    <!-- <br>
    <input type="file" accept="image/png" bind:value={userImage}/> -->
    <br><br>
    {#if password != passwordCheck && password != ''}
        <p style="color:red;">passwords do not match.</p>
        <button disabled>Sign Up!</button>
    {:else if password.length < 6 && password != ''}
        <p style="color:red;">password should have more than 6 characters.</p>
        <button disabled>Sign Up!</button>
    {:else if username == '' || email == '' || password == ''}
        <button disabled>Sign Up!</button>
    {:else}
        <button onclick={() => {registerWithEmailAndPassword(email, password)}}>Sign Up!</button>
    {/if}
</form>

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
