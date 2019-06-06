import React, {Component, Fragment} from 'react';
import EventList from '../EventList';
import GameDetailsModal from '../GameDetailsModal';
import EditGameDetailsModal from '../EditGameDetailsModal';

class Event extends Component {
	constructor(props){
		super(props);

		this.state = {
			loggedInUser: this.props.loggedInUser,
			userId: this.props.userId,
			name: '',
			sport: '',
			description: '',
			location: '',
			date: '',
			maxPlayers: 0,	
			allEvents: [],
			viewGame: {
				createdBy: [],
				date: '',
				description: '',
				location: '',
				maxPlayers: 0,
				memberAttendees: [],
				name: '',
				sport: '',
				_id: ''
			}
			// this component should know who is logged in, and who is looking at this particular event
			// learn this from the app component, tell it back to the app component
		}
	}

	getAllEvents = async () => {
		
		/// this will make a fetch call using an event ID. it will hit the get single event route in the event controller
		const allDetailsReq = await fetch(`${process.env.REACT_APP_EXPRESS_API_URL}/events`, {
			method: 'GET',
			credenetials: 'include',
			headers: {
				'Content-Type':'application/json'
			}
		})

		const parsedEvents = await allDetailsReq.json();

		console.log(parsedEvents, '<-- these are the parsed events');

		// this.setState({
		// 	allEvents: parsedEvents
		// })

		return parsedEvents


		// gather and parse the details of a single event

		// setState to display the details of the component
	};

	componentDidMount(){
		this.getAllEvents().then(events => {
			if(events !== null){
				this.setState({
					allEvents: events.data
				})
			}
		})
		console.log(this.state, '<-- events should be here');
	}

	toggleEdit = async () => {
		
		/// this will toggle the event update route and form 

	};

	handleChange = (e) => {
		e.preventDefault();	
		this.setState({
			[e.target.name]: e.target.value
		})

	};

	handleSubmit = async (e) => {
		e.preventDefault();
		// needs to fetch call that hits the event post route in the memberController
		// must include userId

		const createEventReq = await fetch(`${process.env.REACT_APP_EXPRESS_API_URL}/members/${this.state.userId}/events`,{
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type':'application/json'
			}
		})

		const parsedEventDetails = await createEventReq.json();

		console.log(parsedEventDetails, '<-- these are the created event details');

	};

	handleDelete = async (e) => {
		e.preventDefault();

		// needs E only if there are two functions being called by the onClick


	};

	showGameDetails = (game) => {

		this.setState({
			viewGame: {
				...game
			}
		})

		console.log(game,'<-- game in the show details component in the main event compenent');

	}



	// TO DO: // show only edit capability to the member 'createdBy'

	render(){
		console.log(this.state, '<-- this is the state of the main event component');
		return(
			<Fragment>
				Event Component
				
				<form onSubmit={this.handleSubmit}>
					<label>Create An Event</label>
					<br/>
					Name: <input
						type='text'
						name='name'
						onChange={this.handleChange}
					/> <br/>
					Sport: <input
						type='text'
						name='sport'
						onChange={this.handleChange}
					/> <br/>
					Description: <input
						type='text'
						name='description'
						onChange={this.handleChange}
					/> <br/>
					Location: <input
						type='text'
						name='location'
						onChange={this.handleChange}
					/> <br/>
					Date: <input
						type='date'
						name='date'
						onChange={this.handleChange}
					/> <br/>
					Max Players Allowed: <input
						type='number'
						name='maxPlayers'
						onChange={this.handleChange}
					/> <br/>
					<button type='submit'>
						Create Event
					</button>
				</form>
				<EventList 
					loggedInUser={this.state.loggedInUser}
					game={this.state.allEvents}
					showGameDetails={this.showGameDetails}
				/>
				<GameDetailsModal 
					viewGame={this.state.viewGame}
				/>
				<EditGameDetailsModal
					viewGame={this.state.viewGame}
				/>
			</Fragment>
		)
	}



}


export default Event;