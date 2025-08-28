<script lang="ts">
    import Auth from './components/Auth.svelte';
</script>

<Auth on:signin={() => {console.log("moment")}}>
</Auth>