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
		// console.log('getting the information');
		this.getInfo()
	}

	/// make another method to get all the events that a user created, or two fetches or 

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

		// console.log(parsedUserDetails, '<-- these are the user details');

		const memberInfo = parsedUserDetails.data
		console.log("member info here in getInfo in member -- check for events ");
		console.log(parsedUserDetails.data);
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

		// console.log(this.state, '<-- this is the state of member component');
	};

	toggleEdit = (e) => {
		
		// console.log('toggle edit');
		// console.log(this.state.editActive, '<-- before change');
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
		// console.log(this.state.editActive, '<-- after change');
		
	};

	handleChange = (e) => {

		// console.log(e.target.value, '<-- this is target value');
		// computer property syntax
		this.setState({
			[e.target.name]:e.target.value	
		})
		
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		/// makes a fetch call to the edit user route, sends in body of form, and uses that to update user. saves user in db.
		const updateMemberReq = await fetch(`${process.env.REACT_APP_EXPRESS_API_URL}/members/${this.props.userId}`,{
				method: 'PUT',
				body: JSON.stringify(this.state),
				credentials: 'include',
				headers: {
					'Content-Type':'application/json'
				}
			})

		const updatedMemberResponse = await updateMemberReq.json();

		// console.log(updatedMemberResponse, '<--updated member');
		return updatedMemberResponse;
	};

	handleDelete = async (e) => {
		e.preventDefault();

		const deleteMemberReq = await fetch(`${process.env.REACT_APP_EXPRESS_API_URL}/members/${this.props.userId}`,{
			method: 'DELETE',
			credentials:'include',
			headers: {
				'Content-Type':'application/json'
			}
		})
		const deletedMemberResponse = await deleteMemberReq.json();

		// console.log(deletedMemberResponse, '<-- deleted member');
		return deletedMemberResponse;
	}


	render(){

		// eventsAttending: [],
		// 	eventsCreated: [], these appear in state 

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
						{this.state.eventsCreated}
					</li>
					<li>
						Events Attending:
						{this.state.eventsAttending}
					</li>
				</ul>

				{this.state.editActive ? 
					<form onSubmit={this.handleSubmit}>
						<input
							type='text'
							name='firstName'
							value={this.state.firstName}
							onChange={this.handleChange}
						/><br/>
						<input
							type='text'
							name='lastName'
							value={this.state.lastName}
							onChange={this.handleChange}
						/><br/>
						<input
							type='text'
							name='email'
							value={this.state.email}
							onChange={this.handleChange}
						/><br/>
						<input
							type='text'
							name='bio'
							value={this.state.bio}
							onChange={this.handleChange}
						/><br/>
						<input
							type='number'
							name='age'
							value={this.state.age}
							onChange={this.handleChange}
						/><br/>
						<input
							type='text'
							name='gender'
							value={this.state.gender}
							onChange={this.handleChange}
						/><br/>
						<button 
							onClick={(e) => { 
									this.toggleEdit();
									this.handleSubmit(e);
								}}>
							Save Profile
						</button>
						<button
							onClick={(e) => {
								this.handleDelete(e);
								this.props.logout();
							}}
							>
							Delete Account
						</button>
					</form>
					: 
					<button onClick={this.toggleEdit}>Edit Profile</button>
				}

				
				
			</Fragment>

		)
	}
}

export default Member;