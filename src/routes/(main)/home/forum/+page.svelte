<script lang="ts">
    import ForumInput from './components/ForumInput.svelte';
    import ForumListing from './components/ForumListing.svelte';
    import { firestore } from '$lib/firebase.js';

    import { collection, query, orderBy } from 'firebase/firestore';
    import { collectionStore } from 'sveltefire';

    const posts = collection(firestore, 'forum-posts');
    const q = query(posts, orderBy("date", 'desc'));

    const sortedPosts = collectionStore(firestore, q);

    function getDate(d: Date){
        return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
    }
</script>

<h1>Forum Posts</h1>

<ForumInput></ForumInput>

<!-- svelte-ignore attribute_quoted -->
{#each $sortedPosts as post}
    <ForumListing 
        date="{getDate(new Date(post.date.toDate()))}" 
        title="{post.title}"
        username="{post.owner}"
        userImage="{post.userImage}" 
        post="{post.content}" 
        signature="{post.signature}"/>
{/each}
<style>
    * {
        text-align: center;
        font-family:'Comic Sans MS';
        color:#222222;
    }
</style>