import React from 'react'
import ReactDOM from 'react-dom'

class Test extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ""
    }
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({
      input: e.target.value
    }, console.log(this.state.input))
  } 

  render () {
    return (
      <div>
        <input type='text' onSubmit={this.handleChange}/>
      </div>
    )
  }
}

export default Test