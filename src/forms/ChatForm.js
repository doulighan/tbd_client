import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Dropdown, Form, Input, TextArea } from 'semantic-ui-react'

class ChatForm extends React.Component {
  constructor() {
    super()
    this.state = {
      message: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const player = e.target.player.value
    const message = e.target.message.value
    this.props.socket.emit('message', message )

    this.setState({
      message: ''
    })
  }

  render () {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <TextArea autoHeight name="message" placeholder='message' onChange={this.handleChange} />
          <Button type='submit'>send</Button>
        </Form>
      </div>
    )
  }
}

export default ChatForm