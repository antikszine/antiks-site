<script lang='ts'>
    import { onMount } from 'svelte';
    import GridItem from './components/GridItem.svelte';
    let items: any[] | null | undefined = [];
  
    onMount(async () => {
      const res = await fetch('/archive.json');
      items = await res.json();
    });
</script>
  
  <main>
    <h1>stockpile</h1>
    <div class="grid">
      {#each items as it}
          <GridItem file={it.file} thumb={it.thumb} title={it.title} date={it.date} type={it.type}></GridItem>
      {/each}
    </div>
  </main>

<style>
  main { 
    max-width: 60%; 
    margin: 0 auto; 
    padding: 2rem; 
    min-height: 100vh;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
  }
</style>
  