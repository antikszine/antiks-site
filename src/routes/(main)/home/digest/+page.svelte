<script lang="ts">
    import DigestPost from "./components/DigestPost.svelte";
    import { firestore } from '$lib/firebase.js';

    import { collection, query, orderBy } from 'firebase/firestore';
    import { collectionStore } from 'sveltefire';

    const posts = collection(firestore, 'digest-posts');
    const q = query(posts, orderBy('date','desc'));
    const sortedPosts = collectionStore(firestore, q);

    function getDate(d: Date){
        return d.toLocaleDateString() + ' at ' + d.toLocaleTimeString();
    }
</script>

<h1>antiks' digest</h1>
{#each $sortedPosts as post}
<DigestPost 
    title={post.title}
    author={post.author}
    content={post.content}
    date={getDate(new Date(post.date.toDate()))} />
{/each}