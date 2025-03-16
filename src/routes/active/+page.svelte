<script lang="ts">
  import { onMount } from "svelte";
  import { supabase } from "$lib/supabaseClient";
  import { goto } from "$app/navigation";
  import Mural from "../../types/mural";
  import MuralDisplay from "../../components/muraldisplay.svelte";
  
  let murals: Mural[] = [];
  let loading: boolean = true;
  let error: string | null = null;
  let userName: string = "Guest";
  let availableTiles: Record<number, Set<string>> = {};
  
  function GoBack() {goto('/')}
  async function fetchMurals() {
      try {
          const { data, error } = await supabase.from("murals").select("*");
          if (error) throw error;
          murals = data;
          await fetchAvailableTiles();
      } catch (err) {
          error = (err as Error).message;
          console.error("Error fetching murals:", err);
      } finally {
          loading = false;
      }
  }
  
  async function fetchAvailableTiles() {
      try {
          const muralIds = murals.map(m => m.id);
          const { data, error } = await supabase.from("tiles").select("muralId, position, artistName").in("muralId", muralIds);
          if (error) throw error;
          
          availableTiles = murals.reduce((acc, mural) => {
              acc[mural.id] = new Set();
              return acc;
          }, {} as Record<number, Set<string>>);
          
          data.forEach(tile => {
              availableTiles[tile.muralId].add(JSON.stringify(tile.position));
          });
      } catch (err) {
          console.error("Error fetching available tiles:", err);
      }
  }

  function goToDrawing(muralId: number, position: [number, number]) {
      goto(`/draw/${muralId}/${position[0]}/${position[1]}`);
  }

  onMount(fetchMurals);
</script>

{#if loading}
  <p>Loading murals...</p>
{:else if error}
  <p class="text-red-500">Error: {error}</p>
{:else}

  <button class="btn btn-primary bg-blue-400 ml-10 mt-10 py-6 px-7" on:click={() => goto('/')}>Go Back</button>

  <div class="grid grid-cols-3 gap-4 p-4">
      {#each murals as mural}
          <div class="p-4 border rounded-lg shadow-lg">
              <h2 class="text-lg font-bold">{mural.hostName}'s Mural</h2>
              <p>Theme: {mural.theme}</p>
              <p>Remaining Tiles: {mural.remainingTiles}</p>
              <p>Status: {mural.finished ? "Completed" : "In Progress"}</p>
              
              <div class="grid-container" style="grid-template-columns: repeat({mural.dims[0]}, 40px);">
                  {#each Array(mural.dims[1]).fill(0).map((_, y) => y) as y}
                      {#each Array(mural.dims[0]).fill(0).map((_, x) => x) as x}
                          <button 
                              class="tile-button {availableTiles[mural.id].has(JSON.stringify([x, y])) ? 'occupied' : 'available'}"
                              on:click={() => goToDrawing(mural.id, [x, y])}
                              disabled={availableTiles[mural.id].has(JSON.stringify([x, y]))}
                          >
                              {x},{y}
                          </button>
                      {/each}
                  {/each}
              </div>
          </div>
      {/each}
  </div>
{/if}

<style>
  .grid-container {
      display: grid;
      grid-gap: 4px;
      margin-top: 10px;
  }

  .tile-button {
      width: 40px;
      height: 40px;
      background: lightgray;
      border: 1px solid #333;
      cursor: pointer;
      font-weight: bold;
      text-align: center;
      border-radius: 4px;
  }

  .tile-button.available {
      color: black;
      border: 2px solid black;
  }

  .tile-button.occupied {
      background: darkgray;
      cursor: not-allowed;
  }

  .tile-button:hover:not(.occupied) {
      background: white;
  }
</style>