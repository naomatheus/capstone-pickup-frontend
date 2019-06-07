import React, { Component } from 'react';

class Login extends Component {
	constructor(props){
		super(props);

		this.state = {
			username:'',
			password: ''
		}
	}

	handleSubmit = async (e) => {
		e.preventDefault();

		const loginResponse = await fetch(`${process.env.REACT_APP_EXPRESS_API_URL}/auth/login`,{
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type':'application/json'
				}
			})

		const parsedLogin = await loginResponse.json();

		// console.log(parsedLogin.data, '<-- this is parsed login data');

		const userId = parsedLogin.data.userDbId
		const username = parsedLogin.data.username

		this.props.login(username,userId);
		

	};

	handleChange = (e) => {
		console.log(e.currentTarget.value);

		this.setState({
			// computed property syntax 
			[e.target.name]:e.target.value
		})
	}

	render(){
		return(

			<div>
				Login Here
				<form onSubmit={this.handleSubmit}>
					<input 
						type='text'
						name='username'
						onChange={this.handleChange}
					/><br/>
					<input 
						type='password'
						name='password'
						onChange={this.handleChange}
					/><br/>
					<button type='submit'>
						Login
					</button>
					<br/>
				</form>

			</div>
		)
	}
}

export default Login