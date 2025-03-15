<script lang="ts">
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabaseClient';
    import Mural from '../../types/mural';
    import Tile from '../../types/tile';
  
    let murals: Mural[] = [];
    let tiles: Tile[] = [];
    let sortedMurals: Mural[] = [];
    let sortBy: 'createdAt' | 'remainingTiles' | 'hostName' | 'theme' = 'createdAt';
    let sortOrder: 'asc' | 'desc' = 'asc';
    let userName: string = 'Guest'; // Replace with actual user handling
    let loading: boolean = true;
    let error: string | null = null;
  
    async function fetchMurals(): Promise<void> {
      try {
        const { data, error } = await supabase.from('murals').select('*');
        if (error) throw error;
        murals = data;
        sortMurals();
      } catch (err) {
        error = (err as Error).message;
        console.error('Error fetching murals:', err);
      } finally {
        loading = false;
      }
    }
  
    async function fetchTiles(): Promise<void> {
      try {
        const { data, error } = await supabase.from('tiles').select('*');
        if (error) throw error;
        tiles = data;
      } catch (err) {
        error = (err as Error).message;
        console.error('Error fetching tiles:', err);
      }
    }
  
    function sortMurals(): void {
      sortedMurals = [...murals].sort((a, b) => {
        if (sortBy === 'remainingTiles' || sortBy === 'createdAt') {
          return sortOrder === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
        } else {
          return sortOrder === 'asc' ? a[sortBy].localeCompare(b[sortBy]) : b[sortBy].localeCompare(a[sortBy]);
        }
      });
    }
  
    function canJoinMural(muralId: number): boolean {
      return !tiles.some(tile => tile.muralId === muralId && tile.artistName === userName);
    }
  
    function recursiveTileCheck(muralId: number, artistName: string, remainingTiles: Tile[]): boolean {
      if (remainingTiles.length === 0) return true;
      const [tile, ...rest] = remainingTiles;
      if (tile.muralId === muralId && tile.artistName === artistName) return false;
      return recursiveTileCheck(muralId, artistName, rest);
    }
  
    function canJoinMuralRecursive(muralId: number): boolean {
      return recursiveTileCheck(muralId, userName, tiles);
    }
  
    async function joinMural(muralId: number): Promise<void> {
      if (!canJoinMuralRecursive(muralId)) return;
      try {
        const { data, error } = await supabase.from('tiles').insert([
          {
            artistName: userName,
            muralId: muralId,
            position: 0, // Placeholder, update logic for positioning
            artistRegion: 'Unknown', // Update with actual user region if applicable
          },
        ]);
        if (error || !data) throw error;
        tiles.push(data[0]); // Add the new tile to local state
      } catch (err) {
        console.error('Error joining mural:', err);
      }
    }
  
    onMount(async () => {
      await Promise.all([fetchMurals(), fetchTiles()]);
    });
  </script>
  
  <select bind:value={sortBy} on:change={sortMurals}>
    <option value="created_at">Oldest</option>
    <option value="remainingTiles">Remaining Tiles</option>
    <option value="hostName">Author Name</option>
    <option value="theme">Theme</option>
  </select>
  <select bind:value={sortOrder} on:change={sortMurals}>
    <option value="asc">Ascending</option>
    <option value="desc">Descending</option>
  </select>
  
  {#if loading}
    <p>Loading murals...</p>
  {:else if error}
    <p class="text-red-500">Error: {error}</p>
  {:else}
    <div class="grid grid-cols-3 gap-4 p-4">
      {#each sortedMurals as mural}
        <div class="p-4 border rounded-lg shadow-lg">
          <h2 class="text-lg font-bold">{mural.hostName}'s Mural</h2>
          <p>Theme: {mural.theme}</p>
          <p>Remaining Tiles: {mural.remainingTiles}</p>
          <p>Status: {mural.finished ? 'Completed' : 'In Progress'}</p>
          <button on:click={() => joinMural(mural.id)} disabled={!canJoinMuralRecursive(mural.id)} class="btn btn-primary">
            {canJoinMuralRecursive(mural.id) ? 'Join Mural' : 'Already Contributed'}
          </button>
        </div>
      {/each}
    </div>
  {/if}
  