import React from 'react'
import Message from './Message.js'
import { Segment } from 'semantic-ui-react'

class ChatWindow extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    const messages = this.props.messages.reverse().map( (m, index) => (
      m.player === "player1"? (
        <Segment>
          <Message message={m} key={index} />
        </Segment>
      ) : (
        <Segment secondary>
          <Message message={m} key={index} />
        </Segment>
      )
      )
    )
    return (
      <Segment.Group>
        {messages}
      </Segment.Group>
    )
  }
}

export default ChatWindow