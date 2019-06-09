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
			indexOfEventToEdit: null,
			tempOfEvents: [],
			createEventActive: false,
			//, // number 
			// this component should know who is logged in, and who is looking at this particular event
			// learn this from the app component, tell it back to the app component
			createdBy: []
			/// IF THE USER CREATES AN EVENT, THE USER WILL ALWAYS BE THAT USER. HENCE THEIR USER ID SHOULD BE PUSHED INTO CREATED BY. THIS HAPPENS AT THE DB LEVEL, but not evident at the app level
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

		console.log("here's the events we got");
		console.log(parsedEvents);
		
		this.setState({
			allEvents: parsedEvents.data,
			createEventActive: false
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

		console.log(createEventReq.body, '<-- body of the fetch request in main event component');

		const parsedEventDetails = await createEventReq.json();

		console.log(parsedEventDetails, '<--- new event');

		this.state.allEvents.push(parsedEventDetails);

		this.getAllEvents();
		
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
		const foundIndex = this.state.allEvents.findIndex((element) => {
				
					return element._id === parsedUpdatedEvent.data._id
				}
			
		)

		console.log(foundIndex, '<-- found index of ele to update'); //=> 4 

		// find the event in state
		const originalEvent = this.state.allEvents[foundIndex]
		

		// make a copy of events array in state
		const tempOfEvents = this.state.allEvents;

		this.setState({
			tempOfEvents: tempOfEvents

		})

		console.log(this.state.tempOfEvents, ' <--- temporary events stored here');

		// <-- event to update in copy
		this.state.tempOfEvents[foundIndex] = parsedUpdatedEvent.data;
		// swap the event fro parsedUpdatedEvent.data
		// set state:
		
		console.log(this.state.tempOfEvents, "<-- after replacement");
		// update events array to be your copy
		


		// close edit modal --> null
		// re-open show page --> using index you found
			this.setState({
				indexOfEventToEdit: null,
				indexOfEventToShow: foundIndex,
				allEvents: tempOfEvents
			})
		}

	createEventActive = (e) => {

		if (!this.state.createEventActive){
				this.setState(prevState => ({
					createEventActive: true
				})
			)
		} else {
			this.setState(prevState => ({
					createEventActive: false
				})
			)
		}
	}

	returnToList = (e) => {
		console.log('returning to list');
		this.setState({
			createEventActive: false,
			indexOfEventToShow: null,
			indexOfEventToEdit: null
		})
		// this.state.createEventActive === false &&
		// this.state.indexOfEventToShow === null &&
		// this.state.indexOfEventToEdit === null 
	}

	// TO DO: // show only edit capability to the member 'createdBy'

	render(){
		// console.log(this.state, '<-- this is the state of the main event component');
		return(
			<Fragment>

				Event Component
				<button 
					onClick={this.createEventActive}>
					Create An Event
				</button>
				{
					this.state.createEventActive === false &&
					this.state.indexOfEventToShow === null &&
					this.state.indexOfEventToEdit === null 
					? 
					// <EventList 
					// 	loggedInUser={this.state.loggedInUser}
					// 	allEvents={this.state.allEvents}
					// 	showGameDetails={this.showGameDetails}
					// />
					null
					:
					<form>
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
					<button 
						type='submit'
						onClick={(e)=> {
							this.createEventActive(e);
							this.handleSubmit(e);
							}
						}
						>
						Save New Event
					</button>
				</form>
				}
				

				{
					this.state.indexOfEventToShow === null &&
					this.state.indexOfEventToEdit === null &&
					this.state.createEventActive === false

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
					this.state.indexOfEventToShow === null &&
					this.state.createEventActive === false
					? 
					null 
					:  
					<GameDetailsModal 
						gameToShow={this.state.allEvents[this.state.indexOfEventToShow]}
						editEvent={this.editEvent}
						loggedInUser={this.state.loggedInUser}
						userId={this.state.userId}
						returnToList={this.returnToList}
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