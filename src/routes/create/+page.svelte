<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import Mural from '../../types/mural';

    let muralTheme = ""
    let username = ""
    let region = ""
    let dims: "2 x 2" | "3 x 3" | "4 x 4" = "2 x 2"; 
    let dimensions: [number, number] = [2, 2]

    const dimensionMap: Record<"2 x 2" | "3 x 3" | "4 x 4", number[]> = {
        "2 x 2": [2, 2],
        "3 x 3": [3, 3],
        "4 x 4": [4, 4],
    };

    $: dimensions = dimensionMap[dims] as [number, number];
    
    function GoBack() {goto('/')}
    function Create() {
        goto('/draw')
        let mural = new Mural(username, region, dimensions, muralTheme);
        mural.create()
    }

    // Extract query params from the URL
    const unsubscribe = page.subscribe(($page) => {
        const params = new URLSearchParams($page.url.search);
        username = params.get("username") || "";
        region = params.get("region") || "";
    });

</script>

<button class="btn btn-primary" onclick={GoBack}>Go Back</button>

<div class="general">
    <div class="theme">
        <h1 class="text-5xl font-bold">Mural Theme</h1>
        <input bind:value={muralTheme} type="text" placeholder="Theme" class="input input-neutral">
    </div>
    
    <div>
        <h1 class="text-5xl font-bold">Dimensions</h1>
        <select bind:value={dims} class="select select-neutral">
            <option>2 x 2</option>
            <option>3 x 3</option>
            <option>4 x 4</option>
        </select>
    </div>
    <p>{username}</p>

    <button class="btn btn-neutral" onclick={Create}>Create Mural</button>
    
</div>

<style>
    h1 {
        margin-bottom: 20px;
    }

    .general {
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column; 
        align-items: center;
        gap: 20px; 
        width: 400px; /* Set a larger width */
    }

    .theme {
        margin-bottom: 50px;
    }

    
</style>

