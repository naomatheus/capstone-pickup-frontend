import React, { Component, Fragment} from 'react';


class Member extends Component {
	constructor(props){
		super(props);
	
			this.state = {
			loggedInUser: this.props.username
			// this component should receive the user's information from the DB, probably the entire user object 

			// excluding password for now

			/// member component needs to know who is logged in
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
	}	

	render(){
		return(

			<Fragment>
				<div>
					Member Information
				</div>
			</Fragment>

		)
	}
}

export default Member;