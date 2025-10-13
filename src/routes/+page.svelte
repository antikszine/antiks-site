<script lang="ts">
  import { openModal } from "$lib/modal";
  import Modal from "./components/Modal.svelte"; 
</script>

<main>
  <img src="/LitMinerva2sketchy.png" alt="Landing Logo" />
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
    background: url("/Background.gif") no-repeat center center fixed;
    background-size: cover;
    color: #fff;
    font-family: "Inconsolata", monospace;
    text-align: center;
  }

  img {
    width: 350px;
    height: auto;
    border-radius: 1rem;
    margin-bottom: 2rem;
    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3));
  }

  .guest-link {
    padding: 0.8rem 1.5rem;
    border-radius: 0.5rem;
    background: white;
    color: black;
    font-size: 1.1rem;
    text-decoration: none;
    transition: background 0.3s ease;
  }

  .guest-link:hover {
    background: #ccc;
  }
</style>

