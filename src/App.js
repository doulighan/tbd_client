import React, { Component } from 'react';
import './App.css';
import GameContainer from './components/GameContainer.js'

class App extends Component {
  constructor(props) {
    super(props) 
  }


  render() {
    return (
      <div className="App">
        <GameContainer cableApp={this.props.cableApp} />
      </div>
    )
  }
}

export default App;
