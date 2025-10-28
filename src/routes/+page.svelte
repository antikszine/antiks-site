<script lang="ts">
  import { openModal } from "$lib/modal";
  import Modal from "./components/Modal.svelte"; 
</script>

<main>
  <img src="/Background.gif" class="background" alt="Background" />
  <img src="/wobble midge.gif" class="midge" alt="Landing Logo" />
  <button on:click={openModal}>Continue as Guest</button>
</main>

<Modal />

<style>

  :global(body) {
    margin:0;
    padding:0;
  }

  main {
    position:absolute;
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: "Inconsolata", monospace;
    padding:0;
  }

  .background{
    width:100%;
    height:100%;
    position:absolute;
  }

  .midge {
    width: 500px;
    height: auto;
    z-index: 9;
    border-radius: 1rem;
    margin-bottom: 2rem;
    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3));
  }

  button {
    z-index:9;
  }

  :root {
  --padding: 1rem;
  }
/* mobile formatting */
  @media (max-width: 600px) {
    main {
      background-size: cover;       
      background-attachment: scroll; 
      padding: 0.5rem;
    }

    img {
      width: 80vw; 
      margin-bottom: 1.5rem;
    }
  }
</style>

