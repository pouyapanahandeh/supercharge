import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';


class App extends Component {
  render(){
    return(
      <Router>
        <div className="App">
          <Route path="/game" render={
              ()=>{
                return(<h3>welcome to the game</h3>);
              }
            }/>
        </div>
      </Router>
    )
  }
}

export default App;
