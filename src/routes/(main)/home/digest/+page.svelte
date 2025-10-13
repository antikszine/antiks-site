<script lang="ts">
    import DigestPost from "./components/DigestPost.svelte";
    import { firestore } from '$lib/firebase.js';

    import { collection, query, orderBy } from 'firebase/firestore';
    import { collectionStore } from 'sveltefire';

    const posts = collection(firestore, 'digest-posts');
    const q = query(posts, orderBy('date','desc'));
    const sortedPosts = collectionStore(firestore, q);
    let selectedPost = 0;

    function selectPost(i: number){
        selectedPost = i;
    }

    function getDate(d: Date){
        return d.toLocaleDateString() + ' at ' + d.toLocaleTimeString();
    }
</script>

<h1>antiks' digest</h1>
{#each $sortedPosts as post, i}
{#if i == selectedPost}
    <DigestPost
    title={post.title}
    author={post.author}
    content={post.content}
    date={getDate(new Date(post.date.toDate()))} />
    {#if selectedPost != $sortedPosts.length - 1}
        <h1>more posts</h1>
    {/if}
{:else}
    <button onclick={() => selectPost(i)}>{post.title}, by {post.author} .................... {getDate(new Date(post.date.toDate()))}</button>
{/if}
{/each}

<style>
    h1{
        text-align:center;
    }
    button{
        border:0;
        font-family: "CourierPixel";
        font-size: 1.5em;
        background-color:transparent;
        display:block;
        margin:auto;
        cursor: pointer;
    }
    button:hover {
        font-size: 1.6em;
        color:blue;
    }
</style>