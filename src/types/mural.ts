import { supabase } from "$lib/supabaseClient"

class Mural {
	id: number
	hostName: string
	hostRegion: string
	dims: [number, number]
	finished: boolean
  
	constructor(hostName: string = "Anon Guest", hostRegion: string = "Antarctica", dims: [number, number]) {
	  this.id = 0
	  this.hostName = hostName // created by joining first name last initial together
	  this.hostRegion = hostRegion
	  this.dims = dims
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