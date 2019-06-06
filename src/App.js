import React, {Component} from 'react';
import './App.css';
import Login from './Login';
import Register from './Register';
import Member from './Member';
import Event from './Event';


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
  };

  logout = () => {
      if (this.state.loggedIn){
        this.setState({
          loggedIn: false
        })
      }
  }


  render(){
    return(

          <div className='App'>
          
            {this.state.loggedIn ? 
              <div className='loggedIn'>
                <Member 
                  loggedInUser={this.state.username} 
                  userId={this.state.userId} 
                  logout={this.logout}
                  />
                <br/>
                <Event 
                  loggedInUser={this.state.username}
                  userId={this.state.userId}
                />
              </div>
            : 
            <div className='loggedOut'>
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
