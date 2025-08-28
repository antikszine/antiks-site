<script lang="ts">
    import { auth } from '$lib/firebase';
    import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
    import { goto } from '$app/navigation';

    let username = $state('');
    let userImage = $state('');
    let email = $state('');
    let password = $state('');
    let passwordCheck = $state('');

    const registerWithEmailAndPassword = async (email: string,password: string) => {
            try {
                await createUserWithEmailAndPassword(auth, email, password)
                .then((result => {return updateProfile(result.user,{displayName: username, photoURL: userImage})}))
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
    <br>
    <input type="file" accept="image/png " bind:value={userImage}/>
    {#if password != passwordCheck && password != ''}
        <p style="color:red;">passwords do not match.</p>
        <button disabled>Sign Up!</button>
    {:else if password.length < 6 && password != ''}
        <p style="color:red;">password should have more than 6 characters.</p>
        <button disabled>Sign Up!</button>
    {:else if username == '' || email == '' || password == ''}
        <button disabled>Sign Up!</button>
    {:else}
        <button onclick={() => {registerWithEmailAndPassword(email, password); console.log(userImage)}}>Sign Up!</button>
    {/if}
</form>