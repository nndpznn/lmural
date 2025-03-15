export class Tile {
    id: string;
    muralId: number;
    position: { x: number, y: number };

    constructor(id: string, muralId: number, position: { x: number, y: number }) {
        this.id = id;
        this.muralId = muralId;
        this.position = position;
    }
}