<script>
  import resources from '$lib/resources.json'; // JSON import works in SvelteKit
</script>
  <h1>resources & links</h1>
<main>

  <ul>
    {#each resources as r}
      <li><a href={r.url} target="_blank" rel="noopener noreferrer">{r.name}</a></li>
    {/each}
  </ul>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background: #0a0a0a;
    color: white;
    font-family: "Inconsolata", monospace;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 100vh;
    padding: 2rem;
  }

  h1 {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    max-width: 400px;
  }

  li {
    margin-bottom: 1rem;
  }

  a {
    display: block;
    background: white;
    color: black;
    padding: 1rem 1.2rem;
    border-radius: 0.5rem;
    text-decoration: none;
    font-size: 1.1rem;
    transition: all 0.2s ease;
  }

  a:hover {
    background: #ccc;
    transform: scale(1.02);
  }
</style>
