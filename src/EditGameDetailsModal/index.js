import React, {Component, Fragment} from 'react';

	
class EditGameDetailsModal extends Component {
	constructor(props){
		super(props);

		this.state = {
			date: '',
			location:'',
			description: '',
			name:'',
			sport: ''
		}
	}

	componentDidMount() {
		console.log('calling componentDidMount in EditGameDetailsModal');

		console.log('this.props.gameToEdit:');
		console.log(this.props.gameToEdit);

		this.setState({
			date: this.props.gameToEdit.date,
			location: this.props.gameToEdit.location,
			name: this.props.gameToEdit.name,
			sport: this.props.gameToEdit.sport,
			description: this.props.gameToEdit.description
		})
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.updateEvent(this.props.gameToEdit._id, this.state)

	};

	handleChange = (e) => {
		console.log(e);
		this.setState({
			[e.target.name]:e.target.value
		})		

	};

	handleDelete = async (e) => {
		e.preventDefault();
		const deleteEventReq = await fetch(`${process.env.REACT_APP_EXPRESS_API_URL}/events/${this.props.gameToEdit._id}`);

		const parsedDeletedEvent = await deleteEventReq.json();

		console.log(parsedDeletedEvent,'<-- this is the deleted event');

		return parsedDeletedEvent;
	}

	render(){

		// console.log(this.props.viewGame,'<-- this is props in the edit game details modal ');
		console.log(this.state.gameToEdit, '<--- this is STATE in the edit game details modal');

		return(
			<div>
			This is the edit game details modal
			<form onSubmit={this.handleSubmit}>

				Date:<input 
					text='date'
					name='date'
					value={this.state.date}
					onChange={this.handleChange}
				/><br/>
				Description:<input 
					text='text'
					name='description'
					value={this.state.description}
					onChange={this.handleChange}
				/><br/>
				Location:<input 
					text='text'
					name='location'
					value={this.state.location}
					onChange={this.handleChange}
				/><br/>
				Name:<input 
					text='text'
					name='name'
					value={this.state.name}
					onChange={this.handleChange}
				/><br/>
				Sport:<input 
					text='text'
					name='sport'
					value={this.state.sport}
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