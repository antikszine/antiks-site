<script lang="ts">
    import ForumInput from './components/ForumInput.svelte';
    import ForumListing from './components/ForumListing.svelte';

    import { firestore } from '$lib/firebase.js';
    import { query, orderBy, collection } from 'firebase/firestore';
    import { collectionStore, SignedIn, SignedOut } from 'sveltefire';
    import { onMount } from 'svelte';

    let sortedPosts: any;

    function getPosts(){
        let posts = collection(firestore, 'forum-posts');
        const q = query(posts, orderBy("date", 'desc'));
        sortedPosts = collectionStore(firestore, q);
    }

    onMount(() => {
        getPosts();
    });

    function getDate(d: Date){
        return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
    }
</script>

<h1>Forum</h1>
<!--TODO
    allow post editing
    allow post deletion
    set up admin role
    comments-->

<SignedIn>
    <div class="inputWrapper">
        <ForumInput></ForumInput>
    </div>
</SignedIn>
<SignedOut>
    <p style="color:red; text-align:center;">you must be <a href='/login'>logged in</a> to post. not part of the archive? <a href='/register'>etch your signal</a></p>
</SignedOut>

    {#each $sortedPosts as post}
        <ForumListing 
            date="{getDate(new Date(post.date.toDate()))}" 
            title="{post.title}"
            username="{post.owner}"
            post="{post.content}" 
            signature="{post.signature}"/>
    {/each}

<style>
    h1 {
        text-align: center;
        color:#222222;
    }
    .inputWrapper{
        display:flex;
        flex-direction:column;
        align-items: center;
        justify-items: center;
        justify-content: center;
    }
</style>