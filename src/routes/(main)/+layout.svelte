<script lang="ts">
	import Mascot from '$lib/components/mascot.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import placeholderIcon from '$lib/assets/icons/PLACEHOLDER.png'
	import { page } from '$app/state';
	import ConditionalAside from './components/conditionalAside.svelte';

	import { fly, fade } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	import { auth, firestore, storage } from '$lib/firebase';
	import { FirebaseApp, SignedIn, SignedOut } from 'sveltefire';
	import { signOut } from 'firebase/auth';
    import { onMount } from 'svelte';

	let { children } = $props();

	let collapsed = $state(false);

	let innerWidth = $state(0);
	let innerHeight = $state(0);

	onMount(() => { 
		setTimeout(() => {
			if (innerWidth < innerHeight){
				collapsed = true;
			}
		}, 1000)
	});

	function collapseExpand(){
		collapsed = !collapsed;
	}

	function iconSpinCCW({ duration = 400 }){
		return{
			duration,
			css: (t: number) => {
				const eased = cubicInOut(t);
				return `
				transform: rotate(${eased * 180}deg);
				`
			}
		}
	}

	function iconSpinCW({ duration = 400 }){
		return{
			duration,
			css: (t: number) => {
				const eased = cubicInOut(t);

				return `
				transform: rotate(${180 + eased * 180}deg);
				`
			}
		}
	}

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{page?.data?.post?.title || 'antikszine'}</title>
</svelte:head>

<svelte:window bind:innerWidth bind:innerHeight/>

<FirebaseApp {auth} {firestore} {storage}>
	<div class="layout" style="min-height:{innerHeight};">

		{#if (!collapsed)}
		<div class="sidebar" transition:fly={{ x: -150, duration: 500}}>
			<ConditionalAside isVertical={innerHeight > innerWidth}>
				<!--check if using vertical resolution-->
				{#if (innerHeight > innerWidth)}
				<a onclick={collapseExpand} href="/home">antikszine</a>
				<nav class="links">
					<a onclick={collapseExpand} href="/home/about">manifesto</a>
					<a onclick={collapseExpand} href="/home/digest">digest</a>
					<a onclick={collapseExpand} href="/home/forum">forum</a>
					<a onclick={collapseExpand} href="/home/stockpile">stockpile</a>
					<a onclick={collapseExpand} href="/home/resources">resources</a>
					<a onclick={collapseExpand} href="/home/webring">webring/members</a>
				</nav>

				<div class="auth">
					<SignedOut>
						<a onclick={collapseExpand} href="/home/login">Sign In</a>
						<a onclick={collapseExpand} href="/home/register">Sign Up</a>
					</SignedOut>
					<SignedIn>
						<a onclick={collapseExpand} href="/home/profile">Profile</a>
						<button onclick={() => signOut(auth)}>Sign Out</button>
					</SignedIn>
				</div>
				{:else}
				<a href="/home">antikszine</a>
				<nav class="links">
					<a href="/home/about">manifesto</a>
					<a href="/home/digest">digest</a>
					<a href="/home/forum">forum</a>
					<a href="/home/stockpile">stockpile (works)</a>
					<a href="/home/resources">resources (links)</a>
					<a href="/home/webring">webring & members</a>
				</nav>

				<div class="auth">
					<SignedOut>
						<a href="/home/login">Sign In</a>
						<a href="/home/register">Sign Up</a>
					</SignedOut>
					<SignedIn>
						<a href="/home/profile">Profile</a>
						<button onclick={() => signOut(auth)}>Sign Out</button>
					</SignedIn>
				</div>
				{/if}

			</ConditionalAside>
		</div>
		{/if}

		{#if (collapsed)}
			<button onclick={collapseExpand} class="icon" in:fade={{delay: 290, duration: 1}} out:iconSpinCW={{duration: 300}}><img style="width:42px; background:transparent;" src="{placeholderIcon}" alt="expand"/></button>
		{:else}
			<button onclick={collapseExpand} class="icon" style="transform: rotate(180deg)" in:fade={{delay:290, duration: 1}} out:iconSpinCCW={{duration: 300}}><img style="width:42px; background:transparent;" src="{placeholderIcon}" alt="collapse"/></button>
		{/if}

		<main class="content">
			{@render children?.()}
		</main>
		<Mascot imgSrc="/sketchyminerva1.png" />
	</div>
</FirebaseApp>

<style>
	@font-face {
		font-family: "Inconsolata";
		src: url("/fonts/Inconsolata-VariableFont_wdth,wght.ttf") format("truetype");
		font-weight: normal;
		font-style: normal;
	}

	/*items displayed on this DOM*/
	.layout {
		display: flex;
		font-family: "Inconsolata", monospace;
	}

	.icon {
		position:fixed;
		display:block;
		left:8px;
		bottom:8px;

		color: #000000;
		text-decoration: none;
		background: none;
		border: none;
		cursor: pointer;
		font-size: 0.95rem;
		text-align: left;
		font-family: "IBM Plex Mono", monospace;
	}

	.links,
	.auth {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.sidebar a,
	.sidebar button {
		color: #000000;
		text-decoration: none;
		background: none;
		border: none;
		cursor: pointer;
		font-size: 1.1rem;
		text-align: left;
		font-family: "IBM Plex Mono", monospace;
		padding-right:8px;
	}

	.sidebar a:hover,
	.sidebar button:hover {
		color: #ff4081;
	}

	.content {
		flex: 1;
		padding: 1.5rem;
		background: #fafafa;
		color: #111;
		overflow-y: auto;
		font-family: "IBM Plex Mono", monospace;
	}

	/*globals*/
	:global(body){
		background-color:white;
	}
	:global(input, textarea) {
		padding: 0.5rem 1rem;
		border-radius: 6px;
		border: 1px solid #999;
		background: #CCC;
		color: #000;
		width: 220px;
		font-family: inherit;
	}

	:global(input:focus) {
		outline: none;
		border-color: #ff4081;
	}

	:global(button) {
		padding: 0.5rem 1rem;
		border: 1px solid #999;
		border-radius: 6px;
		background: #CCC;
		color: #ff4081;
		cursor: pointer;
		font-family: inherit;
		transition: 0.2s;
	}

	:global(button:hover) {
		background: #1a1a1a;
		border-color: #ff4081;
	}
 </style>


