import User from "./user"
import Tile from "./tile"

class Mural {
	host: User
	dims: [number, number]
	tiles: Tile[]
	finished: boolean
  
	constructor(host: User, dims: [number, number]) {
	  this.host = host
	  this.dims = dims
	  this.tiles = []
	  this.finished = false
	}
  }
  
  export default Mural