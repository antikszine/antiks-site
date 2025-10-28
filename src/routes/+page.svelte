<script lang="ts">
  import { openModal } from "$lib/modal";
  import Modal from "./components/Modal.svelte"; 
</script>

<main>
  <img src="/wobble midge.gif" alt="Landing Logo" />
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
    background-size: contain;
    color: #fff;
    font-family: "Inconsolata", monospace;
    text-align: center;
  }

  img {
    width: 500px;
    height: auto;
    border-radius: 1rem;
    margin-bottom: 2rem;
    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3));
  }

  .guest-link {
    padding: 1.8rem 1.5rem;
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

  :root {
  --padding: 1rem;
}
/* phone stuff */
  @media (max-width: 768px) {
    main {
      background-size: cover;       
      background-attachment: scroll; 
      padding: 0.5rem;
    }

    img {
      width: 80vw; 
      margin-bottom: 1.5rem;
    }

    .guest-link {
      padding: 1.2rem 1rem;
      font-size: 1rem;
    }
  }
</style>

