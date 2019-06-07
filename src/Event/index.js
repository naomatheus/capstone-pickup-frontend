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
			indexOfEventToShow: null, // number or null
			indexOfEventToEdit: null//, // number 
			// viewGame: {
			// 	createdBy: [],
			// 	date: '',
			// 	description: '',
			// 	location: '',
			// 	maxPlayers: 0,
			// 	memberAttendees: [],
			// 	name: '',
			// 	sport: '',
			// 	_id: ''
			// }
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


		this.setState({
			allEvents: parsedEvents.data
		})

	}



	componentDidMount() {
		this.getAllEvents()
	}

	editEvent =  (idOfEventToEdit) => {

		// find the index of the event with id idOfEventToEdit
		const index = this.state.allEvents.findIndex((element) => {
			if (element._id === idOfEventToEdit){
				return true
			}
		})

		this.setState({
			indexOfEventToEdit: index,
			indexOfEventToShow: null
		}) 
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

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

		// console.log(parsedEventDetails, '<-- these are the created event details');
		return parsedEventDetails

	};

	handleDelete = async (e) => {
		e.preventDefault();

		// needs E only if there are two functions being called by the onClick


	};

	showGameDetails = (indexOfEventToShow) => {

		this.setState({

			// viewGame: {
			// 	...game
			// }
			indexOfEventToShow: indexOfEventToShow
		})


	}

	updateEvent = async (eventId, newData) => {
		console.log('updating event from main event component');

		const updatedEvent = await fetch(`${process.env.REACT_APP_EXPRESS_API_URL}/events/${eventId}`,{
			method: 'PUT',
			credentials: 'include',
			body: JSON.stringify(newData),
			headers: {
				'Content-Type':'application/json'
			}
		})

		const parsedUpdatedEvent = await updatedEvent.json();

		console.log(parsedUpdatedEvent.data, '<-- this is parsedUpdatedEvent');

		/// find index of event in this.state.... with the right id
		// update the event in state
		// make a copy of events array in state
		// swap the event fro parsedUpdatedEvent.data
		// set state:
			// update events array to be your copy
			// close edit modal --> null
			// re-open show page --> using index you found
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

				{
					(this.state.indexOfEventToShow === null &&
					 this.state.indexOfEventToEdit === null) 
					?	 
					<EventList 
						loggedInUser={this.state.loggedInUser}
						allEvents={this.state.allEvents}
						showGameDetails={this.showGameDetails}
					/>
					:
					null
				}
				



				{
					this.state.indexOfEventToShow === null 
					? 
					null 
					:  
					<GameDetailsModal 
						gameToShow={this.state.allEvents[this.state.indexOfEventToShow]}
						editEvent={this.editEvent}
					/>
				}	

				{
					this.state.indexOfEventToEdit === null
					?
					null
					:

					<EditGameDetailsModal
						gameToEdit={this.state.allEvents[this.state.indexOfEventToEdit]}
						updateEvent={this.updateEvent}
					/>
				}


			</Fragment>
		)
	}



}


export default Event;