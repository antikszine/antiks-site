<script lang="ts">
    import { Converter } from "showdown";
    let converter = new Converter();

    let {title, author, date, content} = $props();

    let contentAsHtml = converter.makeHtml(content);
</script>

<section>
    <h2 style="color: #999999;">{date}</h2>
    <h1>{title}</h1>
    <h3>written by {author}</h3>
    <p>{@html contentAsHtml}</p>
</section>

<style>
    section {
        width:90%; 
        margin:auto; 
    }
    h1 {
        margin:0;
    }
    h2{
        margin-top: 10px;
    }
</style>