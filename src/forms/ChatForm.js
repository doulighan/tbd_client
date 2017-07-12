import React from 'react'
import ReactDOM from 'react-dom'

class ChatForm extends React.Component {
  constructor() {
    super()
    this.state = {
      message: ""
    }
  }

  handleChange = (e) => {
    this.setState({
      message: e.target.value
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
          <input type='text' name="textbox" placeholder='type...' onChange={this.handleChange} value={this.state.message} />
          <button type='submit' >send</button>
        </form>
      </div>
    )
  }
}

export default ChatForm