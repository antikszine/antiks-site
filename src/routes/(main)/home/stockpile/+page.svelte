<script>
    import { onMount } from 'svelte';
    let items = [];
  
    onMount(async () => {
      const res = await fetch('/archive.json');
      items = await res.json();
    });
  </script>
  
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
  
  <main>
    <h1>stockpile</h1>
    <div class="grid">
      {#each items as it}
        <a class="card" href={it.file} target="_blank" rel="noopener">
          <img src={it.thumb} alt={it.title} loading="lazy" />
          <div class="info">
            <h2>{it.title}</h2>
            <p>{new Date(it.date).toLocaleDateString()} — {it.type}</p>
          </div>
        </a>
      {/each}
    </div>
  </main>
  