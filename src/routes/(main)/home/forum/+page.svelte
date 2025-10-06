<script lang="ts">
    import ForumInput from './components/ForumInput.svelte';
    import ForumListing from './components/ForumListing.svelte';
    import { firestore } from '$lib/firebase.js';

    import { collectionStore, Collection } from 'sveltefire';

    const posts = collectionStore(firestore, 'forum-posts');
</script>
<!-- TODO: find out how to sort posts (potentially rebuild framework) -->


<h1>Forum Posts</h1>

<ForumInput></ForumInput>

<!-- svelte-ignore attribute_quoted -->
 <Collection ref="forum-posts" let:data>
    {#each data as post}
        <ForumListing 
            date="{post.date as string}" 
            title="{post.title}"
            username="{post.owner}"
            userImage="{post.userImage}" 
            post="{post.content}" 
            signature="{post.signature}"/>
    {/each}
</Collection>
<style>
    * {
        text-align: center;
        font-family:'Comic Sans MS';
        color:#222222;
    }
</style>