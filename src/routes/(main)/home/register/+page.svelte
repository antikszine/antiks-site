<script lang="ts">
    import Auth from './components/Auth.svelte';
    let showWhy = $state(false);
</script>

<main>
    <div>
        <h1>join the archive.</h1>
        <Auth on:signin={() => {console.log("moment")}}></Auth>
        <p style="text-align:center;"><button class="why" onclick={() => {showWhy = !showWhy}}>why would i want an account?</button></p>
        {#if (showWhy)}
            <p style="text-align:center">an account is not needed to view the content of this website. you may not want an account because of google's privacy practices, since this website runs on <a href="https://firebase.google.com">google's firebase</a>. having an account allows you to receive email updates from our newsletter and interact with other users on the <a href="/home/forum">forum</a>. you may still view the content in each of these locations, since it is all freely available on this site, but you may not contribute to it.</p>
        {/if}
    </div>
</main>

<style>
    main{
        min-height:95vh;
        display:grid;
        place-items: center;
    }
    div{
        width:fit-content;
        display:flex;
        flex-direction: column;
        align-items: center;
        margin:auto;
    }
    .why{
        background:transparent;
        border:none;
    }
    .why:hover{
        color: #bd184f;
    }
</style>