import React, {Fragment} from 'react';


const EventList = (props) => {

	const gamesInList = props.game.map((game, i) => {
			console.log(game, '<-- mapping game');
		return(
			<Fragment key={game._id}>
				
				<li key={game._id}>
					<button 
					onClick={props.showGameDetails.bind(null, game)}
					> 
					View this game
					</button>
					<br/>

					game Name: 
					<span> {game.name}  </span>
					<br/>
					Sport: 
					<span> {game.sport} </span>
					<br/>
					game Description: 
					<span> {game.description} </span>
					<br/>
					Max. Players: 
					<span> {game.maxPlayers} 
					<br/>
					</span>
					# of Players Attending: 
					<span> 
						{
							game.memberAttendees.length
						}
					</span>
					<br/>
					Location: 
					<span> {game.location} </span>
					<br/>
					Date: <span> {game.date} </span>
					<br/>
					Created By: 
					<span> 
						{game.createdBy}
					</span>
					
				</li>
			</Fragment>
		)
	})
		return (

			<Fragment>
				game List Component
				
					<div>Hello game list</div>
					<ul>{gamesInList}</ul>
				
			</Fragment>
		)
	
}
 
 // {eventsInList} < -- put this in the bottom render
	
	







export default EventList;