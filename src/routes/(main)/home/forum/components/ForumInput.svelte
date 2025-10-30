<script lang="ts">
    import { firestore, auth } from '$lib/firebase';
    import { userStore, collectionStore, SignedIn } from 'sveltefire';
    import { addDoc, CollectionReference, doc, getDoc, serverTimestamp } from 'firebase/firestore';
    import { goto } from '$app/navigation';

    let postCollection = collectionStore(firestore, 'forum-posts');

    const user = userStore(auth);
    let content = $state('');
    let title = $state('');

    async function saveToFirestore(){
        const userMirror = await getDoc(doc(firestore, "user-mirror", $user?.uid as string))
        try{
            if (auth.currentUser) {
                console.log(auth.currentUser.displayName);
                await addDoc(postCollection.ref as CollectionReference, {
                    date: serverTimestamp(),
                    owner: $user?.displayName, 
                    title: title, 
                    content: content,
                    signature: userMirror.data()?.signature
                }).catch((e) => console.error(e));
                goto('/home');
                goto('/home/forum');
            } else {
                console.log("not logged in");
                throw new Error("no-user-found");
            }
        } catch (error) {
            if (error instanceof Error && "code" in error){
                console.error(error.code);
            }
        }
    }
</script>

<form>
    <input type="text" bind:value={title} placeholder="post title" />
    <br>
	<textarea rows="10" cols="40" bind:value={content} placeholder="write something cool"></textarea>
    <br><br>
	<button onclick={() => {saveToFirestore(); goto('/home'); goto('/home/forum'); goto('/home'); goto('/home/forum');}}>Post</button>
</form>

<style>
    form{
        display:flex;
        flex-direction:column;
        align-items:center;
    }
    textarea {
        width:200%;
        height:200%;
        margin:4px;
    }
    input {
        text-align:center;
        margin:4px;
    }
</style>