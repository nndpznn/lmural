<script lang="ts">
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabaseClient';
    import Mural from '../../types/mural';
  
    let murals: Mural[] = [];
    let sortedMurals: Mural[] = [];
    let sortBy: 'createdAt' | 'remainingTiles' | 'hostName' | 'theme' = 'createdAt';
    let sortOrder: 'asc' | 'desc' = 'asc';
    let userName: string = 'Guest'; // Replace with actual user handling
    let loading: boolean = true;
    let error: string | null = null;
    let joinableMurals: Record<number, boolean> = {};
  
    async function fetchMurals(): Promise<void> {
      try {
        const { data, error } = await supabase
          .from('murals')
          .select('*')
          .order(sortBy, { ascending: sortOrder === 'asc' });
        
        if (error) throw error;
        murals = data;
        await updateJoinableMurals();
      } catch (err) {
        error = (err as Error).message;
        console.error('Error fetching murals:', err);
      } finally {
        loading = false;
      }
    }
  
    async function updateJoinableMurals(): Promise<void> {
      const muralIds = murals.map(m => m.id);
      try {
        const { data, error } = await supabase
          .from('tiles')
          .select('muralId, artistName')
          .in('muralId', muralIds)
          .eq('artistName', userName);
        
        if (error) throw error;
        const joinedMuralIds = new Set(data.map(tile => tile.muralId));
        joinableMurals = murals.reduce((acc, mural) => {
          acc[mural.id] = !joinedMuralIds.has(mural.id);
          return acc;
        }, {} as Record<number, boolean>);
      } catch (err) {
        console.error('Error checking mural participation:', err);
      }
    }
  
    async function joinMural(muralId: number): Promise<void> {
      if (!joinableMurals[muralId]) return;
      try {
        const { data, error } = await supabase.from('tiles').insert([
          {
            artistName: userName,
            muralId: muralId,
            position: [0, 0], // Placeholder, update logic for positioning
            artistRegion: 'Unknown', // Update with actual user region if applicable
          },
        ]);
        if (error || !data) throw error;
        joinableMurals[muralId] = false; // Update local state
      } catch (err) {
        console.error('Error joining mural:', err);
      }
    }
  
    onMount(async () => {
      await fetchMurals();
    });
  </script>
  
  <select bind:value={sortBy} on:change={fetchMurals} class="select select-neutral">
    <option value="createdAt">Oldest</option>
    <option value="remainingTiles">Remaining Tiles</option>
    <option value="hostName">Author Name</option>
    <option value="theme">Theme</option>
  </select>
  <select bind:value={sortOrder} on:change={fetchMurals} class="select select-neutral">
    <option value="asc">Ascending</option>
    <option value="desc">Descending</option>
  </select>
  
  {#if loading}
    <p>Loading murals...</p>
  {:else if error}
    <p class="text-red-500">Error: {error}</p>
  {:else}
    <div class="grid grid-cols-3 gap-4 p-4">
      {#each murals as mural}
        <div class="p-4 border rounded-lg shadow-lg">
          <h2 class="text-lg font-bold">{mural.hostName}'s Mural</h2>
          <p>Theme: {mural.theme}</p>
          <p>Remaining Tiles: {mural.remainingTiles}</p>
          <p>Status: {mural.finished ? 'Completed' : 'In Progress'}</p>
          <button on:click={() => joinMural(mural.id)} disabled={!joinableMurals[mural.id]} class="btn btn-primary">
            {joinableMurals[mural.id] ? 'Join Mural' : 'Already Contributed'}
          </button>
        </div>
      {/each}
    </div>
  {/if}
  