import React, {Component} from 'react';
import './App.css';
import Login from './Login';
import Register from './Register';
import Member from './Member';


class App extends Component {
  constructor(){
    super();
    this.state = {
      loggedIn: false,
      loginMessage: '',
      username: '',
      userId: ''
    }
  }

  login = (username, userId) => {
    
    if (!username){
        this.setState({
          loggedIn:false,
          loginMessage: 'Login unsucessful, please try again'
        })

     } else if (username) {

        this.setState({
          loggedIn: true,
          username: username,
          userId: userId,
          loginMessage: 'Successful!'
       })
    }
    
    console.log(this.state, '<-- this is state in the app component');
  }


  render(){
    return(

          <div className='App'>
          {this.state.loggedIn ? 
            <Member loggedInUser={this.state.username} userId={this.state.userId}/>
            : 
            <div>
               <Login login={this.login}/>
                <br/>
               <Register/>
            </div>
          }
          </div>
        
    )
  }
}


export default App;
