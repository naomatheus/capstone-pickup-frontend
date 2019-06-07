import React, {Fragment} from 'react';

const GameDetailsModal = (props) => {
	
		// console.log(props.viewGame, '<-- these are props in modal');

	return (
		
		<Fragment>
			This is the Show Game Details Modal
			<div>
				Date: {props.viewGame.date}<br/>
				Description: {props.viewGame.description}<br/>
				Location: {props.viewGame.location}<br/>
				Name: {props.viewGame.name}<br/>
				Sport: {props.viewGame.sport}<br/>
				Attending: {props.viewGame.memberAttendees}<br/>
				Host: {props.viewGame.createdBy}
			</div>
		</Fragment>
		)

}


export default GameDetailsModal;