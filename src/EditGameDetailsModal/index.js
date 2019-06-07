import React, {Component, Fragment} from 'react';

	
class EditGameDetailsModal extends Component {
	constructor(props){
		super(props);

		this.state = {
			viewGame: this.props.viewGame,
			date: '',
			location:'',
			name:'',
			sport: ''
		}
	}

	componentDidMount(){
		console.log('calling componentDidMount in EditGameDetailsModal');

		console.log(this.props.viewGame, '<-- viewgame in component did mount');

		this.setState({
			viewGame:this.props.viewGame,
			date: this.props.viewGame.date,
			location: this.props.viewGame.location,
			name: this.props.viewGame.name,
			sport: this.props.viewGame.sport

		})
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.updateEvent(this.props.viewGame._id)

	};

	handleChange = (e) => {
		console.log(e);
		this.setState({
			[e.target.name]:e.target.value
		})		

	};

	handleDelete = async (e) => {
		e.preventDefault();
		const deleteEventReq = await fetch(`${process.env.REACT_APP_EXPRESS_API_URL}/events/${this.props.viewGame._id}`);

		const parsedDeletedEvent = await deleteEventReq.json();

		console.log(parsedDeletedEvent,'<-- this is the deleted event');

		return parsedDeletedEvent;
	}

	render(){

		console.log(this.props.viewGame,'<-- this is props in the edit game details modal ');
		// console.log(this.state.viewGame, '<--- this is STATE in the edit game details modal');

		return(
			<div>
			This is the edit game details modal
			<form onSubmit={this.handleSubmit}>

				Date:<input 
					text='date'
					name='date'
					value={this.state.viewGame.date}
					onChange={this.handleChange}
				/><br/>
				Description:<input 
					text='text'
					name='description'
					value={this.state.viewGame.description}
					onChange={this.handleChange}
				/><br/>
				Location:<input 
					text='text'
					name='location'
					value={this.state.viewGame.location}
					onChange={this.handleChange}
				/><br/>
				Name:<input 
					text='text'
					name='name'
					value={this.state.viewGame.name}
					onChange={this.handleChange}
				/><br/>
				Sport:<input 
					text='text'
					name='sport'
					value={this.state.viewGame.sport}
					onChange={this.handleChange}
				/><br/>
				<button type='submit'>Save Game</button>
				<br/>
				<button 
					onClick={this.handleDelete} 
					type='submit'>Delete Game
				</button>
			</form>
		</div>
		)
	}
}


export default EditGameDetailsModal;