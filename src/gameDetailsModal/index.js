import React, {Fragment} from 'react';

const GameDetailsModal = (props) => {
	
		console.log(props,'<-- props in game details');
		
		/// use the userId of who is logged in to determine whether they should be able to edit the event or not, it is being passed into props
		// compare whether the userId of the user looking at this page matches the createdBy user

		/// this component may need to become smart so that it can send a fetch request to this particular event in the db and hit the PATCH route in the express backend
		// const returnToList = (e) => {
		// 	props.returnToList(e);
		// }
		

	return (
		
		<Fragment>
			This is the Show Game Details Modal
			<div>
				Date: {props.gameToShow.date}<br/>
				Description: {props.gameToShow.description}<br/>
				Location: {props.gameToShow.location}<br/>
				Name: {props.gameToShow.name}<br/>
				Sport: {props.gameToShow.sport}<br/>
				Attending: {props.gameToShow.memberAttendees}<br/>
				Host: {props.gameToShow.createdBy.username}
			</div>
			<div>
				<button 
					onClick={props.editEvent.bind(null, props.gameToShow._id)}
				> 
					Edit this game
				</button>
			</div>
			<div>
				<button 
					onClick={props.returnToList}
				>
				Return to List
				</button>
			</div>
		</Fragment>
		)

}


export default GameDetailsModal;