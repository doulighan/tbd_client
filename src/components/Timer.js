import React from 'react'
import Nested from './Nested.js'

class className extends React.Component {

  constructor(props) {

    super(props)
    this.counter = 0
 
  }

  componentDidUpdate() {
    this.counter++
  
  }

  render () {
    return (
      <div>
        <h3>Timer:</h3>
        <h4> Is Synchronus? </h4>
        <p>Counter: {this.counter}</p>
      </div>
    )
  }
}

export default className