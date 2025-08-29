<script lang="ts">
    import { firestore, auth } from '$lib/firebase';
    import { userStore, collectionStore } from 'sveltefire';
    import { addDoc, CollectionReference, serverTimestamp } from 'firebase/firestore';

    let postCollection = collectionStore(firestore, 'forum-posts');

    let user = userStore(auth);
    let content = $state('');
    let title = $state('');

    async function saveToFirestore(){
        addDoc(postCollection.ref as CollectionReference, {
            date: serverTimestamp() as unknown as string,
            owner: $user?.displayName, 
            userImage: $user?.photoURL,
            title: title, 
            content: content,
            signature: "bottom text"
        });
    }
</script>

<form>
    <input type="text" bind:value={title} placeholder="post title" />
    <br>
	<textarea bind:value={content} placeholder="write something cool"></textarea>
    <br><br>
	<button onclick={saveToFirestore}>Post</button>
</form>