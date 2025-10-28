<script lang="ts">
    import { fly } from 'svelte/transition';
    let { isVertical } = $props();
</script>

{#if isVertical}
<aside class="sidebar" style="position:fixed;">
    <slot/>
</aside>
{:else}
<aside class="sidebar">
    <slot/>
</aside>
{/if}

<style>
	.sidebar {
		height:100%;
		background: #ffffff;
		color: #000000;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		font-family: "Inconsolata", monospace;
	}
</style>