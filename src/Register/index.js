import React, {Component} from 'react';

class Register extends Component {
	constructor(){
		super();

		this.state = {
			username:'',
			firstName: '',
			lastName:'',
			email:'',
			password:'',
			bio: '',
			isHost: false,
			age: 0,
			gender: ''
		}
	}

	handleChange = (e) => {
		
		console.log(e.target, 'this is e.target');
		this.setState ({
				[e.target.name]: e.target.value
			})
		
	}

	render(){
		return(
			<div>

				<form>
					<input 
						type='text'
						placeholder='username'
						name='username'
						onChange={this.handleChange}
					/><br/>   
					<input 
						type='text'
						placeholder='first'
						name='firstName'
						onChange={this.handleChange}
					/><br/>  
					<input 
						type='text'
						placeholder='last'
						name='lastName'
						onChange={this.handleChange}
					/><br/> 
					<input 
						type='text'
						placeholder='email'
						name='email'
						onChange={this.handleChange}
					/><br/>
					<input 
						type='password'
						placeholder='password'
						name='password'
						onChange={this.handleChange}
					/><br/>
					<input 
						type='text'
						placeholder='Enter a short bio'
						name='bio'
						onChange={this.handleChange}
					/><br/>
					<input 
						type='number'
						placeholder='age'
						name='age'
						onChange={this.handleChange}
					/><br/>
					<input 
						type='text'
						placeholder='Male, Female, Non-Binary, or Prfer Not To Say'
						name='gender'
						onChange={this.handleChange}
					/><br/>
					<button type='submit'>Register</button>
				</form>

			</div>
		)

	}
}


export default Register;