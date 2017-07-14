import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Dropdown, Form, Input, TextArea } from 'semantic-ui-react'

class ChatForm extends React.Component {
  constructor() {
    super()
    this.state = {
      message: '',
    }
  }

  handleChange = (e) => {
    if(e.key === 'backspace') {
      this.setState({
        message: this.state.splice(0, -1)
      })
    }
    if(e.key.toString().length > 1) { return }
    this.setState({
      message: this.state.message + e.key
    })
  }


  handleSubmit = (e) => {
    e.preventDefault()
    const message = this.state.message
    console.log(message)
    this.props.socket.emit('message', message )
    this.setState({
      message: ''
    })
  }

  render () {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <TextArea autoHeight name="message" value={this.state.message} placeholder='message' onKeyDown={this.handleChange} />
          <Button type='submit'>send</Button>
        </Form>
      </div>
    )
  }
}

export default ChatForm