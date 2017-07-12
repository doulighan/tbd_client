import React from 'react'
import ChatWindow from './ChatWindow.js'
import ChatForm from '../forms/ChatForm.js'
import Timer from './Timer.js'
import Game from './Game.js'

class GameContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }

  }

  componentDidMount() {
    // debugger
    this.props.cableApp.messages = this.props.cableApp.cable.subscriptions.create({channel: "GameChannel", room: "Game" },
      {
        received: (message) => this.setState({ messages: [message, ...this.state.messages] })
      })
  }


  handleSubmit = (message) => { 
    this.props.cableApp.messages.send({content: message})
  }


  render () {
    return (
      <div>
        <MyLoop />
      </div>
    )
  }
}

export default GameContainer