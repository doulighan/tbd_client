import React from 'react'
import ChatWindow from './ChatWindow.js'
import ChatForm from '../forms/ChatForm.js'

class Game extends React.Component {
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


  handleSubmit = (e) => {
    e.preventDefault() 
    const message = e.target.textbox.value
    this.props.cableApp.messages.send({content: message})
  }



  render () {
    return (
      <div>
        <ChatWindow messages={this.state.messages}/>
        <ChatForm handleSubmit={this.handleSubmit}/>
      </div>
    )
  }
}

export default Game