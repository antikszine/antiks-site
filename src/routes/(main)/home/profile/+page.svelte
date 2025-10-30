<script lang="ts">
    import { auth, firestore } from '$lib/firebase';
    import { userStore } from 'sveltefire';
    import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateProfile } from 'firebase/auth';
    import { deleteUser, type User } from 'firebase/auth';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { doc, getDocs, where, query, collection, setDoc, deleteDoc, getDoc, DocumentSnapshot } from 'firebase/firestore';
    import showdown from "showdown";

    const user = userStore(auth);
    const userMirror = collection(firestore,"user-mirror");


    const Converter = showdown.Converter;
    let converter = new Converter();
    let userSignature = $state('');
    let newUserSignature = $state('');

    let providedPassword = $state('');
    let statusMessage = $state('');
    let newPassword = $state('');
    let newPasswordVerify = $state('');

    let newUsername = $state('');
    let usernameMessage = $state('');

    let showConfirmation = $state(false);
    let areYouSure = $state(false);
    let deleteAccountPassword = $state('');
    let deleteAccErrorMessage = $state('');

    onMount(() => {
        getSignature();
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

    async function deleteAccount(){
        try{
            if ($user != null && areYouSure){
                let credential = EmailAuthProvider.credential(
                    $user?.email as string,
                    deleteAccountPassword
                );
                await reauthenticateWithCredential($user, credential).then(() => {
                    deleteUser($user);
                    deleteDoc(doc(firestore, "user-mirror", $user.uid));
                    goto('/home');
                }).catch((e) => {
                    deleteAccErrorMessage = e as string; 
                    console.log(e);
                });
            } else if (!areYouSure) {
                showConfirmation = false;
            }
        } catch(error){
            if (error instanceof Error && "code" in error){
                console.log(error.code);
                if (error.code as string == "auth/requires-recent-login"){
                    deleteAccErrorMessage = "incorrect password";
                } else {
                    deleteAccErrorMessage = error.code as string;
                }
            }
        }
    }

    async function getSignature(){
        try {
            let userDocument = await getDoc(doc(firestore, "user-mirror", $user?.uid as string)).catch((e) => console.log(e.code));
            if (userDocument instanceof DocumentSnapshot){
                userSignature = converter.makeHtml(userDocument.data()?.signature);
            }
        } catch (error) {
            if (error instanceof Error && 'code' in error){
                console.log(error.code);
            }
        }
    }

    async function setSignature(){
        await setDoc(doc(firestore, "user-mirror", $user?.uid as string), {signature: newUserSignature}).catch((e) => console.log(e.code));
        getSignature();
    }
</script>

<main>
    <h1>{$user?.displayName}'s profile</h1>
    <div class="sectionCard">
        <h3>info</h3>
        <p>associated email: {$user?.email}</p>
        <p>current signature:</p>
        {#await userSignature}
        <p>loading data...</p>
        {:then}
        {@html userSignature}
        {/await}
    </div>

    <div class="macroSection">
        <div class="sectionCard">
            <h3>change username</h3>
            <input placeholder="enter desired username" bind:value={newUsername}/>
            <button onclick={setNewUsername}>submit</button>
            <p>{usernameMessage}</p>
        </div>
        <div class="sectionCard">
            <h3>change signature</h3>
            <textarea rows="5" cols="40" placeholder="enter new signature" bind:value={newUserSignature}></textarea>
            <button onclick={setSignature}>submit</button>
        </div>
    </div>

    <div class="macroSection">
        <div class="sectionCard">
            <h3>reset password</h3>
            <input placeholder="enter current password" type="password" bind:value={providedPassword}/>
            <input placeholder="enter new password" type="password" bind:value={newPassword}/>
            <input placeholder="enter new password again" type="password" bind:value={newPasswordVerify}/>
            <button onclick={setNewPassword}>submit</button>
            <p>{statusMessage}</p>
        </div>
        <div class="sectionCard">
            <h3>delete account</h3>
            <input placeholder="enter your password" type="password" bind:value={deleteAccountPassword}/>
            <button style="background:#FFAAAA;" onclick={deleteAccount}>delete account</button>
            {#if deleteAccErrorMessage != ''}
                <p>{deleteAccErrorMessage}</p>
            {/if}
        </div>
    </div>
</main>

<style>
    main {
        display:flex;
        flex-direction:column;
        align-items:center;
    }
    .sectionCard {
        display:flex;
        flex-direction:column;
        width:fit-content;
        background:#FFF;
        border: 1px solid #ddd;
        border-radius:8px;
        text-align:left;
        padding:8px;
        margin:16px;
    }
    .macroSection {
        display:flex;
        flex-direction:row;
        align-items:center;
    }
    input, button {
        margin:4px;
    }
    h3 {
        text-align:center;
    }
</style>