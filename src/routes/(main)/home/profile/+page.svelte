<script lang="ts">
    import { auth } from '$lib/firebase';
    import { userStore } from 'sveltefire';
    import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateProfile } from 'firebase/auth';
    import type { User } from 'firebase/auth';
    import { goto } from '$app/navigation';

    const user = userStore(auth);
    let providedPassword = $state('');
    let statusMessage = $state('');
    let newPassword = $state('');
    let newPasswordVerify = $state('');

    let newUsername = $state('');

    function setNewPassword(){
        let credential = EmailAuthProvider.credential(
            $user?.email as string,
            providedPassword
        );

        reauthenticateWithCredential($user as User, credential).then(
            () => {
                if (newPassword == newPasswordVerify){
                    updatePassword($user as User, newPassword)
                    statusMessage = 'password successfully reset!';
                } else {
                    statusMessage = "passwords don't match!"
                }
            }
        ).catch(
            () => {statusMessage = "authentication error"; console.log($user?.email)}
        );
    }

    function setNewUsername(){

        if (user) {
            updateProfile($user as User, {displayName: newUsername});
            goto("/home").then(() => goto("/profile"));
        } else {
            console.log("No user found.")
        }
        

    }
</script>

<h1>{$user?.displayName}'s profile</h1>
<h3>account information</h3>
<p>associated email: {$user?.email}</p>
<h3>reset password</h3>
<input placeholder="enter current password" type="password" bind:value={providedPassword}/>
<input placeholder="enter new password" type="password" bind:value={newPassword}/>
<input placeholder="enter new password again" type="password" bind:value={newPasswordVerify}/>
<button onclick={setNewPassword}>submit</button>
<p>{statusMessage}</p>
<h3>change username</h3>
<input placeholder="enter desired username" bind:value={newUsername}/>
<button onclick={setNewUsername}>submit</button>