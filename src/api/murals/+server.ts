import { json } from '@sveltejs/kit';

export async function GET() {
    try {
        // Mock data for murals
        const murals = [
            {
                id: 1,
                artist: "JaneArtist",
                theme: "Ocean Life",
                width: 3,
                height: 4,
                isCompleted: false,
                createdAt: "2025-03-10T08:30:00Z"
            },
            {
                id: 2,
                artist: "ArtistBob",
                theme: "Space Exploration",
                width: 5,
                height: 5,
                isCompleted: false,
                createdAt: "2025-03-12T14:15:00Z"
            },
            {
                id: 3,
                artist: "CreativeCarlo",
                theme: "Urban Jungle",
                width: 4,
                height: 3,
                isCompleted: true,
                createdAt: "2025-03-05T16:45:00Z"
            },
            {
                id: 4,
                artist: "JaneArtist",
                theme: "Mountain Views",
                width: 2,
                height: 3,
                isCompleted: true,
                createdAt: "2025-02-28T09:20:00Z"
            },
            {
                id: 5,
                artist: "PixelPainter",
                theme: "Abstract Patterns",
                width: 4,
                height: 4,
                isCompleted: false,
                createdAt: "2025-03-14T11:10:00Z"
            }
        ];

        return json(murals);
    } catch (error) {
        console.error('Error fetching murals:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch murals' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}