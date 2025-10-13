<script lang="ts">
    import { Converter } from "showdown";
    let converter = new Converter();
    let {title, username, date, post, signature} = $props();

    let htmlPost = converter.makeHtml(post);
</script>

<section>
    <div id="posterInfo">
        <h3 style="position:absolute; margin-left:10px;">{username}</h3>
        <h4>{date}</h4>
    </div>
    <div id="parent">
        <div>
            <h1>{title}</h1>
            <article>{@html htmlPost}</article>
            <br>
            <hr style="width:95%;">
            <p>{@html signature}</p>
        </div>
    </div>
</section>

<style>
    section {
        width:80%; 
        margin:auto; 
        box-shadow:5px 10px 10px #888888;
    }
    h4 {
        text-align:right;
        margin-right:2%;
        padding-top:2%;
    }
    #parent {
        height:fit-content; 
        
        display:flex; 
        flex-direction:row; 
        justify-items:flex-start;

        margin-left:10%; 
        margin-right:10%;
        padding-bottom: 2%;
    }
    h3 {
        width:40%; 
    }
    article {
        font-family:'CourierPixel', cursive;
        font-size:small;
        margin-left:5%;
    }
    p {
        text-align:left;
        margin-left: 5%;
        padding-bottom: 2%;
        font-size:small;
    }
</style>