import { supabase } from "$lib/supabaseClient"
import Tile from "./tile"

class Mural {
	id: number
	hostName: string
	hostRegion: string
	dims: [number, number]
	tiles: string[]             // tiles is a string array of all tile IDs in order. if a tile is uninitialized, it is simply ""
	finished: boolean
  
	constructor(hostName: string = "Anon Guest", hostRegion: string = "Antarctica", dims: [number, number]) {
	  this.id = 0
	  this.hostName = hostName // created by joining first name last initial together
	  this.hostRegion = hostRegion
	  this.dims = dims
	  this.tiles = new Array(dims[0]*dims[1]).fill("")
	  this.finished = false
	}

	async create() {
		const { data, error } = await supabase
		  .from("murals")
		  .insert([
			{
			  hostName: this.hostName,
			  hostRegion: this.hostRegion,
			  dims: this.dims,
			  tiles: this.tiles,
			  finished: this.finished,	
			}
		  ])
		  .select("id")

		if (error) {
			console.error("Oopsie occurred while entering mural:", error)
			return;
		}

		this.id = data[0].id
	}
  }
  
  export default Mural