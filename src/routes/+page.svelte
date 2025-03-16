<script>
    import { goto } from "$app/navigation";

    let username = "";
    let region = "Africa";

    function CreateMural() {
        goto(
            `/create?username=${encodeURIComponent(username)}&region=${encodeURIComponent(region)}`,
        );
    }
    function JoinMural() {
        goto("/active");
    }
    function ViewMurals() {
        goto("/finished");
    }
</script>

<div style="text-align: center; margin-top: 50px">
    <h1 class="text-[200px] font-bold text-center mt-20 title-container">LMURAL</h1>
</div>


<div class="general_container">
    <!-- Login Contatiner -->
    <div class="login_container">
        <input
            bind:value={username}
            type="text"
            placeholder="Username"
            class="input input-neutral"
        />
        <select bind:value={region} class="select select-neutral">
            <option value="Africa">Africa</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Asia">Asia</option>
            <option value="Australia">Australia</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
        </select>
    </div>

    <!-- Game Option Container -->
    <div class="game_container">
        <button class="btn btn-primary bg-gray-500" onclick={CreateMural}
            >Create New Mural</button
        >
        <button class="btn btn-primary bg-gray-500" onclick={JoinMural}
            >Join Existing Mural</button
        >
        <button class="btn btn-primary bg-gray-500" onclick={ViewMurals}
            >View Finished Murals</button
        >
    </div>
</div>

<style>
    .title-container {
        display: inline-block; /* Ensures the animation doesn't affect layout */
        animation: wobble 2s infinite ease;
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
