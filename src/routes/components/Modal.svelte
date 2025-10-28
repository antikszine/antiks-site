<script lang="ts">
  import { showModal, closeModal } from "$lib/modal";
  import { goto } from "$app/navigation";

  function enterSite() {
    goto("/home"); // adjust to your entry route
    closeModal();
  }
</script>

{#if $showModal}
  <div class="overlay">
    <div class="dialog">
      <p>"Discussions of identity and the depths of the internet take place here - do you still want in?”</p>
      <div class="actions">
        <button on:click={enterSite}>YES</button>
        <button on:click={closeModal}>I'M GOOD</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: sans-serif;
  }

  .dialog {
    text-align: center;
    font-size: 1.1rem;
    line-height: 1.6;
  }

  .actions {
    margin-top: 1rem;
  }

  button {
    background: none;
    border: 1px solid white;
    color: white;
    padding: 0.4rem 0.8rem;
    margin: 0 0.5rem;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 1rem;
  }

  button:hover {
    background: white;
    color: black;
  }
</style>
