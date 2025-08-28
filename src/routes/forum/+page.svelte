<script lang="ts">
    import ForumListing from './components/ForumListing.svelte';
	import type { PageProps } from './$types';

    let list: string[] = $state([]);
    let post = $state('');

	let { data }: PageProps = $props();
</script>

<form>
	<label>
		<textarea bind:value={post}></textarea>
	</label>
    <br><br>
	<button onclick={() => { list.push(post) }}>Post</button>
</form>

<h1>Forum Posts</h1>

<!-- svelte-ignore attribute_quoted -->
<ForumListing 
date="{new Date().toLocaleDateString()} {new Date().getHours()}:{new Date().getMinutes()}" 
title="you suck at the game"
username="ballslover32" 
userImage="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.stiripesurse.ro%2Fimage%2F202504%2Fw1200%2Fmedia-174533117282325600.jpg&f=1&nofb=1&ipt=93ba1d942af0a1200e2ec0d9c5c8c9b09108285b8cec64ab2da5c6c33df64ec7" 
post="you suck, i hate you. literally kill yourself i never want to see you here ever again bitch. i bet you can't even get over 100 in hyper demon motherfucker. my dog can play hyper demon better than you and i dont even have a fucking dog." 
signature="fuck you, <br><br> Da Vance"/>

<style>
    * {
        text-align: center;
        font-family:'Comic Sans MS';
        color:#222222;
    }
</style>