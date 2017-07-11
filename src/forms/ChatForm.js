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

  render () {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <input type='text' name="textbox" placeholder='type...' onChange={this.handleChange} value={this.state.message} />
          <button type='submit' >send</button>
        </form>
      </div>
    )
  }
}

export default ChatForm