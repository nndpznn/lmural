import { supabase } from "$lib/supabaseClient";

class Tile {
	id?: number
	artistName: string
	artistRegion: string
	position: number
	muralId: number
	contentAddr: string

	// content: // Custom Data Type to be added later
  
	constructor(artistName: string, artistRegion: string, position: number, muralId: number) {
	  this.artistName = artistName
	  this.artistRegion = artistRegion
	  this.position = position
	  this.muralId = muralId
	  this.contentAddr = ''

	}

		async create() {
			const { data, error } = await supabase
			  .from("tiles")
			  .insert([
				{
				  artistName: this.artistName,
				  artistRegion: this.artistRegion,
				  position: this.position,
				  muralId: this.muralId
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

export default Tile;
