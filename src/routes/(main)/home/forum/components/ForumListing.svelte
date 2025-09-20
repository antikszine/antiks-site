<script lang="ts">
    let {title, username, userImage, date, post, signature} = $props();
</script>

<section>
    <h4>{date}</h4>
    <div id="parent">
        <div style="padding-right:2%; border-right:3px solid #888888;">
            <h3>{username}</h3>
            <img src="{userImage}" alt="{username}'s profile image" />
        </div>
        <div>
            <h2>{title}</h2>
            <article>{@html post}</article>
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
    img {
        width:150px;
        height:150px;
    }
    h3 {
        width:40%; 
    }
    h2 {
        text-align:left;
        margin-left:5%;
        font-size:medium;
    }
    article {
        font-family:'Comic Sans MS', cursive;
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