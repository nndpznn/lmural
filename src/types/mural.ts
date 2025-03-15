import { supabase } from "$lib/supabaseClient"

class Mural {
	id: number
	hostName: string
	hostRegion: string
	dims: [number, number]
	theme: string
	remainingTiles: number
	finished: boolean
  
	constructor(hostName: string = "Anon Guest", hostRegion: string = "Antarctica", dims: [number, number], theme: string = "") {
	  this.id = 0
	  this.hostName = hostName // created by joining first name last initial together
	  this.hostRegion = hostRegion
	  this.dims = dims
	  this.theme = theme
	  this.remainingTiles = dims[0] * dims[1]
	  this.finished = false
	}

	updateRemainingTiles(completedTiles: number) {
		this.remainingTiles = (this.dims[0] * this.dims[1]) - completedTiles
	}
	
	async create() {
		const { data, error } = await supabase
		  .from("murals")
		  .insert([
			{
			  hostName: this.hostName,
			  hostRegion: this.hostRegion,
			  dims: this.dims,
			  theme: this.theme,
			  remainingTiles: this.remainingTiles,
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