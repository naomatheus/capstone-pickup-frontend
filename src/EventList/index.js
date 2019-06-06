import React, {Component, Fragment} from 'react';


class EventList extends Component {
	constructor(props){
		super(props)

		this.state = {
			allEvents: [],
			// this component will need to receive...  
			loggedInUser: this.props.loggedInUser,
			eventId: ''
		}
	}

	componentDidMount(){
		this.getAllEvents();
	}
	// this component will need to fetch all of the events from the db
	getAllEvents = async () => {
		
		const allEventsReq = await fetch(`${process.env.REACT_APP_EXPRESS_API_URL}/events`,{
			method: 'GET',
			credentials:'include',
			headers: {
				'Content-Type':'application/json'
			}
		});

		const parsedEvents = await allEventsReq.json();

		console.log(parsedEvents.data, '<-- these are all events in the DB json parsed');

		this.setState({
			allEvents: parsedEvents.data
		})

	};
	
	showDetails = async (e, game) => {
		
		console.log(game);

		// this method should be able to find the details of one particular event

		const singleEvent = await fetch(`${process.env.REACT_APP_EXPRESS_API_URL}/events/${game._id}`, {
			method: 'GET',
			credentials:'include',
			headers: {
				'Content-Type':'application/json'
			}
		})

		const parsedSingleEvent = await singleEvent.json();

		console.log(parsedSingleEvent, 'this is the event found at the 1th index of all events in the events list component\'s state');

		/// issue is grabbing the event's ID and using it the fetch request
		// this component needs to know the specific event, or the child component will need to know the specific event
	}
	


	render() {

		const eventsInList = this.state.allEvents.map((event, i) => {
				console.log(event, '<-- mapping event');
				

			return(
				<Fragment key={event._id}>
					
					<li key={event._id}>
						<button 
						onClick={this.showDetails}
						> 
						View this Event
						</button>
						<br/>

						Event Name: 
						<span> {event.name}  </span>
						<br/>
						Sport: 
						<span> {event.sport} </span>
						<br/>
						Event Description: 
						<span> {event.description} </span>
						<br/>
						Max. Players: 
						<span> {event.maxPlayers} 
						<br/>
						</span>
						# of Players Attending: 
						<span> 
							{
								event.memberAttendees.length
							}
						</span>
						<br/>
						Location: 
						<span> {event.location} </span>
						<br/>
						Date: <span> {event.date} </span>
						<br/>
						Created By: 
						<span> 
							{event.createdBy}
						</span>
						
					</li>
				</Fragment>
			)
		})

		return (

			<Fragment>
				Event List Component
				<ul>
					{eventsInList}
				</ul>
			</Fragment>
		)
	}
}


export default EventList;