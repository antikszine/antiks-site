<script lang="ts">
	import favicon from '$lib/assets/favicon-32x32.png';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{page?.data?.post?.title || 'antikszine'}</title>
</svelte:head>

<!-- default layout, only renders its children -->

{@render children?.()}



