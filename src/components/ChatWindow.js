import React from 'react'
import Message from './Message.js'

class ChatWindow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  mapMessages = () => {
    this.props.messages.map( m => { <Message content={m} /> })
  }

  render () {
    return (
      <div>
        {this.mapMessages()}
      </div>
    )
  }
}

export default ChatWindow