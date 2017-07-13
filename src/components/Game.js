import React from 'react'
import Player from '../objects/Player'
import Screen from '../objects/Screen'
import Ball from '../objects/Ball'
import {Segment, Button, Form} from 'semantic-ui-react'
import io from 'socket.io-client'
   
    const WIDTH = 650
    const HEIGHT = WIDTH / 1.625
    const socket = io('http://192.168.5.178:3000')

class Game extends React.Component {

  constructor(props) {
    super(props)
    this.canvas = document.getElementById('canvas')
    this.canvas.style.display = 'none'
    this.screen = new Screen(this.canvas, WIDTH, HEIGHT)
    this.ball = new Ball(this.screen.width/2, this.screen.height/2, this.screen)
    this.player1 = new Player(this.screen, "blue", false, this.ball)
    this.player2 = new Player(this.screen, "red", true, this.ball)
    this.whichPlayer = ''
  }

  componentDidMount() {
    this.dest = this.refs.dest
    this.destCTX = this.dest.getContext('2d')
    this.dest.width = WIDTH
    this.dest.height = HEIGHT

    socket.on('connect', () => {
      console.log('socket connected', socket.id)
    })
    socket.on('game', (p) => this.whichPlayer = p )
    console.log(this.whichPlayer)
    socket.on('START', msg => this.startGame(msg))
  }
  
  startGame(msg) {
    if(msg === 'START') {
      console.log("Server says start")
      this.bindKeys()
      setInterval(this.gameLoop.bind(this), 1000 / 35)
    }
  }

  bindKeys() {
    if(this.whichPlayer === 'P1') {
      console.log(this.whichPlayer, 'keys')
      document.addEventListener('keyup', this.handleUp1.bind(this))
      document.addEventListener('keydown', this.handleDown1.bind(this))
    } else if (this.whichPlayer === 'P2') {
      console.log(this.whichPlayer, 'keys')
      document.addEventListener('keyup', this.handleUp2.bind(this))
      document.addEventListener('keydown', this.handleDown2.bind(this))
    }
  }  

  sendToServer() {
    var data = {}
    if(this.whichPlayer === 'P1'){
      data = {
        P1: {
          x: this.player1.x,
          y: this.player1.y
        },
        ball: {
          x: this.ball.x,
          y: this.ball.y,
        }
      }
    }
    if(this.whichPlayer === 'P2'){
      data = {
        P2: {
          x: this.player2.x,
          y: this.player2.y
        }
      }
    }
    socket.emit(this.whichPlayer.toString(), JSON.stringify(data))
  }

  fromServer(data) {
    if(data == null) {return}
    if(this.whichPlayer === "P1") {
      this.player2.x = data.P2.x 
      this.player2.y = data.P2.y
    }
    if(this.whichPlayer === "P2") {
      this.player1.x = data.P1.x 
      this.player1.y = data.P1.y 
      this.ball.x = data.ball.x 
      this.ball.y = data.ball.y 
    }
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
    if(this.whichPlayer === 'P1') {
      this.player1.update()
      this.player2.checkCollision()
      this.ball.update()
    }
    if(this.whichPlayer === 'P2') {
      this.player2.update()
      this.player1.checkCollision()
      // this.ball.checkCollision()
    }
  }

  gameRender() {
    this.screen.ctx.clearRect(0, 0, this.screen.width, this.screen.height)
    this.destCTX.clearRect(0, 0, this.screen.width, this.screen.height)
    this.ball.render()
    this.player1.render()
    this.player2.render()


    this.destCTX.drawImage(this.canvas, 0, 0)
    // this.forceUpdate() 
  }

  gameLoop() {
    this.update()
    this.sendToServer()
    socket.on('in', (data) => this.fromServer(JSON.parse(data)))
    this.gameRender()
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