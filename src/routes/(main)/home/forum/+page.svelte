<script lang="ts">
    import ForumInput from './components/ForumInput.svelte';
    import ForumListing from './components/ForumListing.svelte';

    import { firestore } from '$lib/firebase.js';
    import { query, orderBy, collection } from 'firebase/firestore';
    import { collectionStore } from 'sveltefire';

    let posts = collection(firestore, 'forum-posts');
    const q = query(posts, orderBy("date", 'desc'));
    const sortedPosts = collectionStore(firestore, q);

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


<ForumInput></ForumInput>

<!-- svelte-ignore attribute_quoted -->
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
</style>