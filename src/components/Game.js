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

    this.gameState = {
      isPlayer1: this.isPlayer1,
      isPlayer2: this.isPlayer2,
      player1Ready: this.player1Ready,
      player2Ready: this.player2Ready,
      player1: {
        x: this.player1.x,
        y: this.player1.y,
        dir: this.player1.dir
      },
      player2: {
        x: this.player2.x,
        y: this.player2.y,
        dir: this.player2.dir
      },
      ball: {
        x: this.ball.x,
        y: this.ball.y,
        dir: this.ball.dir
      }
    }
  }


  componentDidMount() {
    this.dest = this.refs.dest
    this.destCTX = this.dest.getContext('2d')
    this.dest.width = WIDTH
    this.dest.height = HEIGHT

    setInterval(this.gameLoop.bind(this), 1000 / 60)

    this.props.cableApp.gameState = this.props.cableApp.cable.subscriptions.create({channel: "GameChannel", room: "game" },
    {
      received: (data) => this.handleRecieved(data)
    })
  }

  handleRecieved(data) {
    this.player1Ready = data.player1Ready
    this.player2Ready = data.player2Ready
    if(this.isPlayer1) {
      this.player2.x = data.player2.x,
      this.player2.y = data.player2.y,
      this.plauer2.dir = data.player2.dir
    }
    if(this.isPlayer2) {
      this.player1.x = data.player1.x,
      this.player1.y = data.player1.y,
      this.plauer1.dir = data.player1.dir
    }
  }

  sendState = () => { 
    this.props.cableApp.gameState.send({content: this.gameState})
  }

  createState = () => {
    this.gameState ={
      ball: {
        x: this.ball.x,
        y: this.ball.y,
        dir: this.ball.dir
      }
    }
  }

  bePlayer1 = (e) => {
    e.preventDefault()
    console.log(e)
    document.addEventListener('keyup', this.handleUp1.bind(this))
    document.addEventListener('keydown', this.handleDown1.bind(this))
    this.player1Ready = true
    this.isPlayer1 = true
  }

  bePlayer2 = (e) => {
    e.preventDefault()
    document.addEventListener('keyup', this.handleUp2.bind(this))
    document.addEventListener('keydown', this.handleDown2.bind(this))
    this.player2Ready = this.player2
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
    this.player1.update()
    this.player2.update()
    this.ball.update()
    
    this.createState()
    this.sendState()
  }

  gameRender() {
    this.screen.ctx.clearRect(0, 0, this.screen.width, this.screen.height)
    this.destCTX.clearRect(0, 0, this.screen.width, this.screen.height)
    this.player1.render()
    this.player2.render()
    this.ball.render()

    this.destCTX.drawImage(this.canvas, 0, 0)
    // this.forceUpdate() 
  }

  gameLoop() {
    console.log(this.player1Ready, this.player2Ready)
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
      </div>
    </Segment>
    
    )
  }
}

export default Game