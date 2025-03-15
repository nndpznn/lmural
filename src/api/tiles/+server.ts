import { json } from '@sveltejs/kit';
import { Tile } from '../../../types/tile.js';

export async function GET() {
    try {
        // Mock data for tiles
        // This would come from your database in a real implementation
        const tiles: Tile[] = [];
        
        // Generate tiles for mural ID 1 (3x4)
        generateTilesForMural(tiles, 1, 3, 4, 3); // 3 tiles remaining
        
        // Generate tiles for mural ID 2 (5x5)
        generateTilesForMural(tiles, 2, 5, 5, 10); // 10 tiles remaining
        
        // Generate tiles for mural ID 3 (4x3)
        generateTilesForMural(tiles, 3, 4, 3, 0); // 0 tiles remaining (completed)
        
        // Generate tiles for mural ID 4 (2x3)
        generateTilesForMural(tiles, 4, 2, 3, 0); // 0 tiles remaining (completed)
        
        // Generate tiles for mural ID 5 (4x4)
        generateTilesForMural(tiles, 5, 4, 4, 8); // 8 tiles remaining

        return json(tiles);
    } catch (error) {
        console.error('Error fetching tiles:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch tiles' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

// Helper function to generate tiles for a specific mural
function generateTilesForMural(tilesArray: Tile[], muralId: number, width: number, height: number, remainingTiles: number) {
    const totalTiles = width * height;
    const completedTiles = totalTiles - remainingTiles;
    
    // Generate a set of random positions for the completed tiles
    const completedPositions = new Set();
    while (completedPositions.size < completedTiles) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        completedPositions.add(`${x}-${y}`);
    }
    
    // Create all tiles for this mural
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const posKey = `${x}-${y}`;
            const isCompleted = completedPositions.has(posKey);
            
            tilesArray.push({
                id: `mural${muralId}-tile-${x}-${y}`,
                muralId: muralId,
                position: { x, y }
            });
        }
    }
}