import React, { Component } from 'react';
import './App.css';
import SocketAdapter from './components/SocketAdapter.js'

class App extends Component {
  constructor(props) {
    super(props) 
  }

  forceRender() {
    this.forceUpdate()
  }


  render() {
    return (
      <div>
        <SocketAdapter cableApp={this.props.cableApp} />  
      </div>
    )
  }
}

export default App;
