<script>
    import { goto } from '$app/navigation';

    let username = ""
    let region = ""

    function CreateMural() { goto('/create') }
    function JoinMural() { goto('/active') }
    function ViewMurals() { goto('/finished') }

</script>


<h1 class="text-[200px] font-bold text-center mt-20">LMURAL</h1>

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
        <button class="btn btn-primary bg-gray-500" onclick={CreateMural}>Create New Mural</button>
        <button class="btn btn-primary bg-gray-500" onclick={JoinMural}>Join Existing Mural</button>
        <button class="btn btn-primary bg-gray-500" onclick={ViewMurals}>View Finished Murals</button>
    </div>
</div>

<style>
    h1 {
        /* animation: wobble 2s infinite ease-in-out; */
        transform-origin: center;
        /* overflow-x: hidden; */
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
