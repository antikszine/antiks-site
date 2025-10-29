<script lang="ts">
    import { auth, firestore } from '$lib/firebase';
    import { collectionStore, userStore } from 'sveltefire';
    import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateProfile } from 'firebase/auth';
    import type { User } from 'firebase/auth';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { doc, getDocs, where, query, collection, setDoc } from 'firebase/firestore';

    const user = userStore(auth);
    const userMirror = collection(firestore,"user-mirror");

    interface UserName {
        displayName?: string;
    }

    let providedPassword = $state('');
    let statusMessage = $state('');
    let newPassword = $state('');
    let newPasswordVerify = $state('');

    let newUsername = $state('');
    let usernameMessage = $state('');

    onMount(() => {
        if(!$user){
            goto('/home');
        }
    })

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

    async function displayNameSerialized(){
        let displayNameSerialized: string = '';
        const snapshot = await getDocs(query(userMirror, where("displayName", "==", newUsername)));
        snapshot.forEach((doc) => {
            displayNameSerialized = doc.data().displayName as string;
        });
        return displayNameSerialized;
    }

    async function setNewUsername(){
        usernameMessage = '';
        try{
            const displayNameExists: boolean = await displayNameSerialized() == '';
            if(displayNameExists) {
                updateProfile($user as User, {displayName: newUsername});
                setDoc(doc(firestore, "user-mirror", $user?.uid as string), {
                    displayName: newUsername as string,
                });
            } else {
                usernameMessage = 'username is taken :('
                throw new Error('username is taken!');
            }
        } catch (error) {
            if (error instanceof Error && "code" in error){
                usernameMessage = error.code as string;
                console.log(error.code)
            }
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
<p>{usernameMessage}</p>