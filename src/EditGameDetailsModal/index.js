import React, {Component, Fragment} from 'react';


	
class EditGameDetailsModal extends Component {
	constructor(props){
		super(props);

		this.state = {
			viewGame: this.props.viewGame
		}
	}

	componentDidMount(){
		this.setState({
			viewGame:this.props.viewGame
		})
	}

	render(){

		console.log(this.props.viewGame,'<-- this is props in the edit game details modal ');
		console.log(this.state.viewGame, '<--- this is STATE in the edit game details modal');

		return(
			<Fragment>
			This is the edit game details modal
			<div>
				Date:<input 
					text='date'
					name='date'
					value={this.state.viewGame.date}
					onChange={this.handleChange}
				/>
				Description:<input 
					text='text'
					name='description'
					value={this.state.viewGame.description}
					onChange={this.handleChange}
				/>
				Location:<input 
					text='text'
					name='location'
					value={this.state.viewGame.location}
					onChange={this.handleChange}
				/>
				Name:<input 
					text='text'
					name='name'
					value={this.state.viewGame.name}
					onChange={this.handleChange}
				/>
				Sport:<input 
					text='text'
					name='sport'
					value={this.state.viewGame.sport}
					onChange={this.handleChange}
				/>
			</div>
		</Fragment>
		)
	}
}


export default EditGameDetailsModal;