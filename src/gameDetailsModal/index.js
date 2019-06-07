import React, {Fragment} from 'react';

const GameDetailsModal = (props) => {
	
		console.log(props);

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
				Host: {props.gameToShow.createdBy}
			</div>
			
			<button 
				onClick={props.editEvent.bind(null, props.gameToShow._id)}
			> 
				Edit this game
			</button>

		</Fragment>
		)

}


export default GameDetailsModal;