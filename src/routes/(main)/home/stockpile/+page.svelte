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
    main { max-width: 1000px; margin: 0 auto; padding: 2rem; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 1rem;
    }
    .card {
      background: #fff;
      border: 1px solid #eee;
      border-radius: 10px;
      overflow: hidden;
    }
    img {
      width: 100%;
      aspect-ratio: 4/3;
      object-fit: cover;
    }
    .info {
      padding: .5rem .75rem;
    }
    h2 {
      font-size: 1rem;
      margin: 0;
    }
    p {
      font-size: 0.85rem;
      color: #666;
    }
  </style>
  