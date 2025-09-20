<script lang="ts">
  import { openModal } from "$lib/modal";
  import Modal from "./components/Modal.svelte"; 
</script>

<main>
  <img src="/your-landing-image.png" alt="Landing Logo" />
  <button on:click={openModal}>Continue as Guest</button>
</main>

<Modal />

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #111;
    color: #fff;
    font-family: sans-serif;
  }

  img {
    max-width: 250px;
    border-radius: 50%;
    margin-bottom: 2rem;
  }

  button {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    color: black;
    font-size: 1.1rem;
    cursor: pointer;
  }

  button:hover {
    background: #303030;
  }
</style>
