<script lang="ts">
    import { onMount } from "svelte";

    export let imgSrc: string;


  onMount(() => {
    //randomize image on page load
    const fileNames = import.meta.glob('/src/lib/assets/minerva/*.png');
    const randomValue = Math.floor(Math.random() * Object.entries(fileNames).length);
    imgSrc = `${Object.entries(fileNames)[randomValue][0]}`;
    show = true;
  });

  const messages = [
    "hiiii ehehe~",
    "do you guys like yaoi?",
    "sometimes chat forums scare me a lot more than they should.",
    "drink ur water or ill find you.",
    "click me again, i love it when u do that",
    "have you read the jotakak horse doujinshi yet?",
    "i hope ur having a nice day :3",
    "say thank you to lauren, mike, naomi, jess-- just go to the member's page already.",
    "my boss makes me feel the same way a good yaoi does.",
    "i need to feed my cat!",
    "have you guys seen my cat?",
  ];

  let current = "welcome to antiks :3";
  let show = false;

  function sayRandom() {
    const message = messages[Math.floor(Math.random() * messages.length)];

    current = message.split("").map((char, i) => `<span style="--i:${i}">${char}</span>`).join("");
    show = true;
  }

  function handleAnimationEnd() {

    show = false;
  }
</script>

<button class="mascot" onclick={sayRandom}>
  {#if show}
    <div class="bubble fade" onanimationend={handleAnimationEnd}>
      {@html current}
      <span class="tail"></span>
    </div>
  {/if}
  <img src={imgSrc} alt="mascot" />
</button>

<style>
  .mascot {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    cursor: pointer;
    width: 150px;   /* reasonable size */
    height: auto;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    z-index: 1000;
    background: transparent;
    border:0;
  }

  .mascot img {
    width: 100%;
    height: auto;
    border-radius: 0; /* full PNG visible */
    display: block;
  }

  .bubble {
    position: absolute;
    bottom: 170px; /* sits above the mascot */
    right: 0;
    background: #fff;
    color: #111;
    border: 1px solid #ccc;
    border-radius: 14px;
    padding: 0.7rem 1rem;
    font-size: 1rem;
    max-width: 300px;
    box-shadow: 0 3px 8px rgba(0,0,0,0.2);
  }

  .bubble .tail {
    position: absolute;
    bottom: -10px;
    left: 30px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #fff;
    filter: drop-shadow(0 -1px 1px rgba(0,0,0,0.15));
  }

  .fade {
    animation: fadeInOut 4s forwards;
  }

  @keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(6px); }
    10% { opacity: 1; transform: translateY(0); }
    90% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-10px); }
  }

  /* Wavy text effect */
  .bubble span {
    display: inline-block;
    animation: wave 1s infinite;
    animation-delay: calc(var(--i) * 0.05s);
  }

  @keyframes wave {
    0%, 100% { transform: translateY(0); }
    25% { transform: translateY(-4px); }
    50% { transform: translateY(4px); }
    75% { transform: translateY(-2px); }
  }
</style>
