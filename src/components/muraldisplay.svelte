<script lang="ts">
    import '../types/mural.ts';
    
    let {size} = $props();
    let mural = null

    import { supabase } from '$lib/supabaseClient';

    /**
     * Interface representing a tile in the mural.
     * Each tile has a position (x, y) and may contain an SVG file reference (content).
     */
    interface TileData {
    position: [number, number];
    content: string | null; // Null means tile is unfilled
    }

    /**
     * Interface representing a mural, including its dimensions and associated tiles.
     */
    interface MuralData {
    id: number;
    dims: [number, number];
    tiles: TileData[][];
    }

    /**
     * Fetch a mural along with its tiles from Supabase.
     * Organizes tile data into a 2D array for easier placement.
     */
    async function fetchMuralWithTiles(muralId: number): Promise<MuralData | null> {
    try {
        // Fetch mural details
        const { data: mural, error: muralError } = await supabase
        .from('murals')
        .select('id, dims')
        .eq('id', muralId)
        .single();
        
        if (muralError) throw muralError;
        
        // Fetch all tiles associated with this mural
        const { data: tiles, error: tileError } = await supabase
        .from('tiles')
        .select('position, content')
        .eq('muralId', muralId);
        
        if (tileError) throw tileError;
        
        // Create an empty 2D grid for tile placement
        let tileGrid: (TileData | null)[][] = Array.from({ length: mural.dims[0] }, () =>
        Array(mural.dims[1]).fill(null)
        );
        
        // Place tiles in the correct positions within the 2D grid
        for (const tile of tiles) {
        const [x, y] = tile.position;
        tileGrid[y][x] = { position: [x, y], content: tile.content };
        }
        
        console.log(tileGrid[0][0].content)
        return { id: mural.id, dims: mural.dims, tiles: tileGrid };
    } catch (error) {
        console.error('Error fetching mural:', error);
        return null;
    }
    }

    let biggest_dim = $state(0);
    let image_size = $state(0);
    let dims = $state([0,0])
    async function updateMural () {
        mural = await fetchMuralWithTiles(1);
        dims = mural.dims
        biggest_dim = (mural.dims[0] >= mural.dims[1]) ? mural.dims[0] : mural.dims[1];
        image_size = Math.round(size / biggest_dim);
        console.log(mural)
    }
    
    updateMural();

</script>

<div class='grid-y'>
{#each {length: dims[0]} as y, i}
    <span class='grid-x'>
    {#each {length: dims[1]} as x, j}
        {#if !(mural.tiles[i][j])}
            <img src="/sorrynothing.png" width={image_size} height={image_size}>
        {:else}
            <svg width={image_size} height={image_size}>
                <image xlink:href={mural.tiles[i][j].content} width={image_size} height={image_size}/>
            </svg>
        {/if}
    {/each}
    </span>
{/each}
</div>

<style>
    .grid-y {
        display: flex;
    }

    .grid-x > *:not(:hover) {
        border: 2px solid rgba(0,0,0,0);
    }

    .grid-x > *:hover {
        border: 2px solid rgb(220, 183, 80);
    }
</style>