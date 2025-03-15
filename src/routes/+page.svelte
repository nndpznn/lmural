<script>
    // Component logic (if any)
</script>

<div class="container">
    <h1 class="text-8xl">LMUral Splash Page</h1>
    <p>
        Visit <a href="https://svelte.dev/docs/kit" target="_blank"
            >SvelteKit Documentation</a
        >
    </p>
</div>

<!-- Background animation covering the whole screen -->
<div id="canvas"></div>

<style>
    h1 {
        text-decoration: underline;
        animation: wobble 2s infinite ease-in-out;
    }

    @keyframes wobble {
        0%,
        100% {
            transform: rotate(0deg) scale(1);
        }
        25% {
            transform: rotate(-3deg) scale(1.05);
        }
        50% {
            transform: rotate(3deg) scale(1.1);
        }
        75% {
            transform: rotate(-3deg) scale(1.05);
        }
    }

    /* Make background animation full-screen */
    #canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgb(36, 70, 182) url("/background_overlay.png") top left;
        background-size: auto;
        background-repeat: repeat;
        animation: panning 10s infinite linear;
        z-index: -1;
    }

    @keyframes panning {
        0% {
            background-position: 0px 0px;
        }
        50% {
            background-position: 400px 200px;
        }
        100% {
            background-position: 0px 600px;
        }
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center; /* Centers horizontally */
        text-align: center;
        gap: 20px;
        padding: 50px;
        position: absolute; /* Keeps it positioned relative to the viewport */
        top: 50px; /* Adjust this value as needed for spacing from the top */
        left: 50%;
        transform: translateX(-50%); /* Only shift horizontally */
        width: 100%;
        max-width: 90vw;
        z-index: 1;
    }

    a {
        color: blue;
        text-decoration: underline;
    }
</style>
