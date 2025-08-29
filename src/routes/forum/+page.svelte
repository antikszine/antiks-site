<script lang="ts">
    import ForumInput from './components/ForumInput.svelte';
    import ForumListing from './components/ForumListing.svelte';
    import { firestore } from '$lib/firebase';

    import { collectionStore, Collection } from 'sveltefire';

	import type { PageProps } from './$types';
    import type { CollectionReference } from 'firebase/firestore';
	let { data }: PageProps = $props();

    let postCollection: CollectionReference = collectionStore(firestore, 'forum-posts') as unknown as CollectionReference;
</script>

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