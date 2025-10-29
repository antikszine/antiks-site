<script lang="ts">
    import Auth from './components/Auth.svelte';
</script>

<main>
    <div class="login">
        <h1>welcome back</h1>
        <Auth on:signin={() => {console.log("Successfully signed in!")}}>
        </Auth>
        <p>not immortalized in the archive? <a href="/home/register">add your signal.</a></p>
    </div>
</main>

<style>
    main{
        display:grid;
        place-items: center;
        min-height:95vh;
    }
    .login {
        width:fit-content;
        display:flex;
        flex-direction: column;
        align-items: center;
        margin:auto;
    }
</style>