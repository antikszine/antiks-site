<script lang="ts">
    import Auth from './components/Auth.svelte';
</script>

<Auth on:signin={() => {console.log("moment")}}>
</Auth>
<p>dont have an account? dont be lame, <a href="/register">sign up.</a></p>