import Tile from "./tile"

class Mural {
	hostName: string
	hostRegion: string
	dims: [number, number]
	tiles: Tile[]
	finished: boolean
  
	constructor(hostName: string = "Anon Guest", hostRegion: string = "Antarctica", dims: [number, number]) {
	  this.hostName = hostName
	  this.hostRegion = hostRegion
	  this.dims = dims
	  this.tiles = []
	  this.finished = false
	}
  }
  
  export default Mural