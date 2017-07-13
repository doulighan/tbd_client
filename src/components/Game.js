import React from 'react'
import Player from '../objects/Player'
import Screen from '../objects/Screen'
import Ball from '../objects/Ball'
import {Segment, Button, Form} from 'semantic-ui-react'
   
    const WIDTH = 650
    const HEIGHT = WIDTH / 1.625

class Game extends React.Component {

  constructor(props) {
    super(props)
    this.canvas = document.getElementById('canvas')
    this.canvas.style.display = 'none'
    this.screen = new Screen(this.canvas, WIDTH, HEIGHT)
    this.ball = new Ball(this.screen.width/2, this.screen.height/2, this.screen)
    this.player1 = new Player(this.screen, "blue", false, this.ball)
    this.player2 = new Player(this.screen, "red", true, this.ball)
    this.player1Ready = false
    this.player2Ready = false
    this.isPlayer1 = false
    this.isPlayer2 = false
    this.recievedState = {}
  }


  componentDidMount() {
    this.dest = this.refs.dest
    this.destCTX = this.dest.getContext('2d')
    this.dest.width = WIDTH
    this.dest.height = HEIGHT

    setInterval(this.gameLoop.bind(this), 1000 / 30)

    this.props.cableApp.gameState = this.props.cableApp.cable.subscriptions.create({channel: "GameChannel", room: "game" },
    {
      received: (data) => this.handleRecieved(data.content)
    })
  }

  handleRecieved(data) {
    console.log(data)
    this.recievedState = {
      player1ready: data.player1Ready,
      ready2: data.player2Ready,
      x: data.x,
      y: data.y,
      dir: data.dir
    }
  }

  sendState = () => { 
    if(this.player1) {
      this.props.cableApp.gameState.send({
        content: {
          player1Ready: this.player1Ready,
          x: this.player2.x,
          y: this.player2.y,
          dir: this.player2.dir
        }}
      )
    }
    if(this.player2) {
      this.props.cableApp.gameState.send({
        content: {
          player2Ready: this.player2Ready,
          x: this.player1.x,
          y: this.player1.y,
          dir: this.player1.dir
        }}
      )
    }
  }

  bePlayer1 = (e) => {
    e.preventDefault()
    document.addEventListener('keyup', this.handleUp1.bind(this))
    document.addEventListener('keydown', this.handleDown1.bind(this))
    this.player1Ready = true
    this.isPlayer1 = true
  }

  bePlayer2 = (e) => {
    e.preventDefault()
    document.addEventListener('keyup', this.handleUp2.bind(this))
    document.addEventListener('keydown', this.handleDown2.bind(this))
    this.player2Ready = true
    this.isPlayer2 = true
  }

  handleDown1(event) {
    event.preventDefault()
    switch (event.keyCode) {
      case 87:
        this.player1.dir = -1
        break
      case 83:
        this.player1.dir = 1
        break
    }
  }

  handleUp1(event) {
    event.preventDefault()
    if (event.keyCode === 87 || event.keyCode === 83 ) {
      this.player1.dir = 0
    } 
  }

  handleDown2(event) {
    event.preventDefault()
    switch (event.keyCode) {
      case 79:
        this.player2.dir = -1
        break
      case 76:
        this.player2.dir = 1
        break
    }
  }

  handleUp2(event) {
    event.preventDefault()
    if ( event.keyCode === 79 || event.keyCode === 76) {
      this.player2.dir = 0
    } 
  }

  update() {
    if(this.isPlayer1) {
      this.player2.x = this.recievedState.x
      this.player2.y =  this.recievedState.y
      this.dir = this.recievedState.dir
      this.player2Ready = this.recievedState.ready2
    }
    if(this.isPlayer2) {
      this.player1.x = this.recievedState.x
      this.player1.y =  this.recievedState.y
      this.dir = this.recievedState.dir
      this.player1Ready = this.recievedState.ready1
    }
    
    this.player1.update()
    this.player2.update()
    this.ball.update()

  }

  gameRender() {
    this.screen.ctx.clearRect(0, 0, this.screen.width, this.screen.height)
    this.destCTX.clearRect(0, 0, this.screen.width, this.screen.height)
    this.player1.render()
    this.player2.render()
    this.ball.render()

    this.destCTX.drawImage(this.canvas, 0, 0)
    this.forceUpdate() 
  }

  gameLoop() {
    this.sendState()
    if(this.player1Ready && this.player2Ready) {
      this.update()
      this.gameRender()
    }
  }



  render () {
    return (
    <Segment color={'olive'} inverted tertiary>
      <div id="game-window">
        <Button type="submit" onClick={this.bePlayer1}>Player 1</Button>
        <Button type="submit" onClick={this.bePlayer2}>Player 2</Button>
        <canvas id="imCanvas" ref="dest" style={{'backgroundColor':'white'}}/>
        <h2>P1?: {this.player1Ready} P2? {this.player2Ready} </h2>
        <h2>You are p1?: {this.isPlayer1} </h2>
      </div>
    </Segment>
    
    )
  }
}

export default Game