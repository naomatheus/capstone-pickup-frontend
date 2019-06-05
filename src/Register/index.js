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

	handleSubmit = async (e) => {
		
		e.preventDefault();
		//// this handlesubmit function will make a fetch request to the DB's registration route
		try {

			console.log(process.env.REACT_APP_EXPRESS_API_URL);

			const registerResponse = await fetch(`${process.env.REACT_APP_EXPRESS_API_URL}/auth/register`,{
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type':'application/json'
				}
			});

			await console.log(registerResponse, '<-- this is registerResponse');

			const parsedResponse = await registerResponse.json();

			let message = '';
			if (parsedResponse.data._id){
				message = 'login was successful'
				console.log(message);
				console.log(parsedResponse, '<-- this is logged in user');
			} 

			 else if (!parsedResponse.data._id){
				message = 'there was an issue registering'
				console.log(message);
			}

		} catch (err) {
			console.log(err);
		}

	};


	handleChange = (e) => {
		
		
		this.setState ({
				[e.target.name]: e.target.value
			})
		
	}

	render(){
		return(
			<div>

				<form onSubmit={this.handleSubmit}>
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