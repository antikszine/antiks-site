<script lang="ts">
    import Auth from './components/Auth.svelte';
    import { auth, firestore } from '$lib/firebase';
    import { FirebaseApp } from 'sveltefire';
</script>

<FirebaseApp {auth} {firestore}>
    <Auth on:signin={() => {console.log("moment")}}>
    </Auth>
</FirebaseApp>