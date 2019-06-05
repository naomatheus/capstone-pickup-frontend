import React, {Component} from 'react';
import './App.css';
import Login from './Login'
import Register from './Register'


class App extends Component {
  constructor(){
    super();
    this.state = {
      loggedIn: false,
      // loginSucess: false,
      username: '',
      userId: ''
    }
  }
  render(){
    return(
        <div className='App'>

          App component here

          <Login/>
          <br/>
          <Register/>

        </div>
    )
  }
}


export default App;
