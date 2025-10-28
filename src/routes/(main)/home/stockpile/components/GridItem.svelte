<script lang="ts">
    let { file, thumb, title, date, type } = $props();
</script>

<a class="card" href={file} target="_blank" rel="noopener">
  <img src={thumb} alt={title} loading="lazy" />
  <div class="info">
    <h2>{title}</h2>
    <p>{new Date(date).toLocaleDateString()} — {type}</p>
  </div>
</a>

<style>
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