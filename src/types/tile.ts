import { supabase } from "$lib/supabaseClient"

class Tile {
	id: number
	artistName: string
	artistRegion: string
	position: number
	muralID: number

	// content: // Custom Data Type to be added later
  
	constructor(artistName: string, artistRegion: string, position: number, muralID: number) {
	  this.id = 0
	  this.artistName = artistName
	  this.artistRegion = artistRegion
	  this.position = position
	  this.muralID = muralID

	}

		async create() {
			const { data, error } = await supabase
			  .from("tiles")
			  .insert([
				{
				  artistName: this.artistName,
				  artistRegion: this.artistRegion,
				  position: this.position,
				  muralID: this.muralID
				}
			  ])
			  .select("id")
	
			if (error) {
				console.error("Oopsie occurred while entering tiles:", error)
				return;
			}
	
			this.id = data[0].id
		}
  }
  
  export default Tile