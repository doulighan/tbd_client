import React from 'react'
import Message from './Message.js'

class ChatWindow extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    const messages = this.props.messages.map( m => (
      <li>
        <Message message={m} />
      </li>
      )
    )
    return (
      <div>
        <ul>{messages}</ul>
      </div>
    )
  }
}

export default ChatWindow