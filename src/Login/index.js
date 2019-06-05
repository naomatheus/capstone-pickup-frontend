import React, { Component } from 'react';

class Login extends Component {
	constructor(){
		super();

		this.state = {
			username:'',
			password: ''
		}
	}

	render(){
		return(

			<div>
				Login Here
				<form>
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