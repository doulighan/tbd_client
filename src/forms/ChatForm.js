import React from 'react'
import ReactDOM from 'react-dom'

class ChatForm extends React.Component {
  constructor() {
    super()
    this.state = {
      message: []
    }
  }

  handleChange = (e) => {
    debugger
    let newMsg = this.state.message
    newMsg.push(e.key)
    this.setState({
      message: newMsg
    })
  }

  handleSubmit = (e) => {
    e.preventDefault() 
    const message = e.target.textbox.value
    this.props.handleSubmit(message)

    this.setState({
      message: ""
    })
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' name="textbox" placeholder='type...' onKeyDown={this.handleChange} value={this.state.message.join('')} />
          <button type='submit' >send</button>
        </form>
      </div>
    )
  }
}

export default ChatForm