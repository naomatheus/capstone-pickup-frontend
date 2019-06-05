import React, { Component, Fragment} from 'react';


class Member extends Component {
	constructor(props){
		super(props);
	
			this.state = {
			loggedInUser: this.props.loggedInUser,
			// this component should receive the user's information from the DB, probably the entire user object 

			// excluding password for now

			/// member component needs to know who is logged in
			age: 0,
			bio: '',
			email: '',
			firstName: '',
			lastName: '',
			gender: '',
			eventsAttending: [],
			eventsCreated: [],
			editActive: false
		};

	}

	componentDidMount(){
		console.log('getting the information');
		this.getInfo()
	}

	getInfo = async () => {
		// I think this will be a fetch call to automatically retrieve the information from the user who is logged in 
		// will hit the show member details route in the backend 
		const userDetailsReq = await fetch(`${process.env.REACT_APP_EXPRESS_API_URL}/members/${this.props.userId}`,{
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type':'application/json'
				}
			})

		const parsedUserDetails = await userDetailsReq.json();

		console.log(parsedUserDetails, '<-- these are the user details');

		const memberInfo = parsedUserDetails.data

		// ({memberInfo.age, memberInfo.bio ...rest} = {a, b})

		// console.log(a, '<-- this is a', b, '<--this is b');
		// can I spread the information in a setState call?
			/// try to destructure what is being set in state

		this.setState({
			
			age: memberInfo.age,
			bio: memberInfo.bio,
			email: memberInfo.email,
			firstName: memberInfo.firstName,
			lastName: memberInfo.lastName,
			gender: memberInfo.gender,
			eventsAttending: [],
			eventsCreated: []

		})

		console.log(this.state, '<-- this is the state of member component');
	};

	toggleEdit = (e) => {
		
		console.log('toggle edit');
		console.log(this.state.editActive, '<-- before change');
		if (!this.state.editActive){
			this.setState(prevState => ({
				editActive: true
			})
			)
		} else if (this.state.editActive){
			this.setState(prevState => ({
				editActive: false
			})
			)
		}
		console.log(this.state.editActive, '<-- after change');
		
	}


	render(){
		return(

			<Fragment>
				<div className='userDetails'>
					Your Member Information
					<br/>
					Name: {this.state.firstName + ' ' + this.state.lastName}
					<br/>
					Email: {this.state.email}
					<br/>
					Bio: {this.state.bio}
					<br/>
					Age: {this.state.age} 
					<br/>
					Gender: {this.state.gender}
				</div>
				<ul>
					<li>
						Events Created:
					</li>
					<li>
						Events Attending:
					</li>
				</ul>

				{this.state.editActive ? 
					<button onClick={this.toggleEdit}>Save Profile</button>
					
					: 
					<button onClick={this.toggleEdit}>Edit Profile</button>
				}

				
				
			</Fragment>

		)
	}
}

export default Member;