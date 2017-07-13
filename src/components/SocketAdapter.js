import React from 'react'
import ChatWindow from './ChatWindow.js'
import ChatForm from '../forms/ChatForm.js'
import Game from './Game.js'
import { Segment, Grid } from 'semantic-ui-react'

class SocketAdapter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }

  }

  componentDidMount() {
    // this.props.cableApp.messages = this.props.cableApp.cable.subscriptions.create({channel: "Messages", room: "Message" },
    //   {
    //     received: (message) => this.setState({ messages: [message, ...this.state.messages] })
    //   })
  } 


  handleSubmit = (message) => { 
    this.props.cableApp.messages.send({content: message})
  }




  render () {
    return (
      <Grid columns={2}>
        <Grid.Column>
          <div id="gamediv">
            <Game cableApp={this.props.cableApp}/>
          </div>
        </Grid.Column>
      </Grid>
    )
  }
}

//<ChatWindow messages={this.state.messages}/>
//<ChatForm handleSubmit={this.handleSubmit}/>

export default SocketAdapter