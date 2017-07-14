import React from 'react'
import ChatWindow from './ChatWindow.js'
import ChatForm from '../forms/ChatForm.js'
import Game from './Game.js'
import { Segment, Grid, Header } from 'semantic-ui-react'

import io from 'socket.io-client'

var sock




class SocketAdapter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
    }
  }

  setPlayer(e) {
    e.preventDefault()
    this.setState({
      player: e.target.player.value
    })
  }

  componentDidMount() {
    setTimeout(this.connectSocket, 10000)
  }
  connectSocket() {
    sock = io('http://192.168.5.178:3000')
    sock.on('connect', () => {
      console.log('sock connected in sock adapter')
    })

    sock.on('messageResp', (mes) => {
      this.setState({messages: [
        mes,
        ...this.state.messages
      ]})
      console.log('message emmited', this.state.messages)})
  }



  render () {
    return (
      <div>
        <div style={{'background': '#22c1c3', 'background': '-webkit-linear-gradient(to left, #fdbb2d, #22c1c3)', 'background': 'linear-gradient(to left, #fdbb2d, #22c1c3)'}}>
        <center>
        <Header border='5px' inverted as='h1'>PonGo</Header>
         <div id="gamediv container">
             <Game />
         </div>
         </center>
        </div>
        <div>
        <Segment raised>
          <ChatWindow messages={this.state.messages}/>
          <ChatForm  setPlayer={this.setPlayer.bind(this)} socket={sock}/>
        </Segment>
        </div>
      </div>
    )
  }
}

//<ChatWindow messages={this.state.messages}/>
//<ChatForm handleSubmit={this.handleSubmit}/>

export default SocketAdapter