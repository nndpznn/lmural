<script>
    import { goto } from '$app/navigation';

    let username = ""
    let region = ""

    function CreateMural() { goto('/create') }
    function JoinMural() { goto('/active') }
    function ViewMurals() { goto('/finished') }

</script>

<div class="container">
    <h1 class="text-8xl font-bold text-blue-300">LMUral Splash Page</h1>
    <!-- <p>
        Visit <a href="https://svelte.dev/docs/kit" target="_blank"
            >SvelteKit Documentation</a
        >
    </p> -->
</div>

<!-- Background animation covering the whole screen -->
<div id="canvas"></div>

<div class="general_container">

    <!-- Login Contatiner -->
    <div class="login_container">
        <input bind:value={username} type="text" placeholder="Username" class="input input-neutral">
        <select bind:value={region} class="select select-neutral">
            <option value="">Africa</option>
            <option value="">Antarctica</option>
            <option value="">Asia</option>
            <option value="">Australia</option>
            <option value="">Europe</option>
            <option value="">North America</option>
            <option value="">South America</option>
        </select>
    </div>

    <!-- Game Option Container -->
    <div class="game_container">
        <button class="btn btn-primary" onclick={CreateMural}>Create New Mural</button>
        <button class="btn btn-primary" onclick={JoinMural}>Join Existing Mural</button>
        <button class="btn btn-primary" onclick={ViewMurals}>View Finished Murals</button>
    </div>
</div>

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
        align-items: center; 
        text-align: center;
        gap: 20px;
        padding: 50px;
        position: absolute; 
        top: 50px; 
        left: 50%;
        transform: translateX(-50%); 
        width: 100%;
        max-width: 90vw;
        z-index: 1;
    }

    .login_container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        margin-bottom: 30px;
    }

    .general_container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column; 
        align-items: center;
        gap: 20px; 

    }

    .game_container {
        display: flex;
        gap: 25px; 
    }

    .input {
       margin: 10px;
    }

    a {
        color: blue;
        text-decoration: underline;
    }
</style>
