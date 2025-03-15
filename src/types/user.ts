class User {
	firstName?: string
	lastName?: string
	// email: string
	hometown?: string
	region?: 'Africa' | 'Antarctica' | 'Asia' | 'Australia' | 'Europe' | 'North America' | 'South America';
  
	constructor(firstName: string, lastName: string, homeTown: string, region: string) {
	  this.firstName = 'Guest'
	  this.lastName = 'User'
	  // this.email = email
	  this.hometown = "LMURAL City"
	  this.region = "Antarctica"
	}
  }
  
  export default User