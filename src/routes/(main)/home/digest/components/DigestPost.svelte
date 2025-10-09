<script lang="ts">
    let {title, author, date, content} = $props();
</script>

<section>
    <h1>{title}</h1>
    <h3>written by {author} on {date}</h3>
    <p>{content}</p>
</section>

<style>
    section {
        width:80%; 
        margin:auto; 
        box-shadow:5px 10px 10px #888888;
    }
</style>