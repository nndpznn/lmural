<script>
    let muralTheme = ""
    let dims = ""

    import { goto } from '$app/navigation';
    function GoBack() {goto('/')}
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

    <button class="btn btn-neutral">Create Mural</button>
    
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

