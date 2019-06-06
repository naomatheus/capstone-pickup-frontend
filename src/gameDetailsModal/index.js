import React, {Fragment} from 'react';

const GameDetailsModal = (props) => {
	
		console.log(props.viewGame, '<-- these are props in modal');

	return (
		<Fragment>
			<div>
				Date: {props.viewGame.date}
				Description: {props.viewGame.description}
				Location: {props.viewGame.location}
				Name: {props.viewGame.name}
				Sport: {props.viewGame.sport}
				Attending: {props.viewGame.memberAttendees}
				Host: {props.viewGame.createdBy}
			</div>
		</Fragment>
		)
}


export default GameDetailsModal;