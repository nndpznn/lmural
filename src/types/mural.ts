import User from "./user"
import Tile from "./tile"

class Mural {
	host: User
	dims: [number, number]
	tiles: Tile[]

	// location: Coordinates (later)
  
	constructor(host: User, dims: [number, number]) {
	  this.host = host
	  this.dims = dims
	  this.tiles = []
	}
  }
  
  export default Mural