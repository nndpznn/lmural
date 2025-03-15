class User {
	firstName?: string
	lastName?: string
	// email: string
	hometown?: string

	// location: Coordinates (later)
  
	constructor(firstName: string, lastName: string, homeTown: string) {
	  this.firstName = 'Guest'
	  this.lastName = 'User'
	  // this.email = email
	  this.hometown = "LMURAL City"
	}
  }
  
  export default User