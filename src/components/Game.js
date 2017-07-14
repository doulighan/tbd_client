import React from 'react'
import Player from '../objects/Player'
import Screen from '../objects/Screen'
import Ball from '../objects/Ball'
import {Segment, Button, Form} from 'semantic-ui-react'
import io from 'socket.io-client'
   
const WIDTH = 900
const HEIGHT = WIDTH / 1.8

var socket

class Game extends React.Component {

  constructor(props) {
    super(props)
    this.canvas = document.getElementById('canvas')
    this.canvas.style.display = 'none'
    this.screen = new Screen(this.canvas, WIDTH, HEIGHT)
    this.ball = new Ball(this.screen.width/2, this.screen.height/2, this.screen)
    this.player1 = new Player(this.screen, "yellow", false, this.ball)
    this.player2 = new Player(this.screen, "#4f5e68", true, this.ball)
    this.whichPlayer = ''
  }

  componentDidMount() {
    this.dest = this.refs.dest
    this.destCTX = this.dest.getContext('2d')
    this.dest.width = WIDTH
    this.dest.height = HEIGHT
    socket = this.props.socket

    socket.on('connect', () => {
      console.log('socket connected', socket.id)
    })
    socket.on('game', (p) => this.whichPlayer = p)
    if(this.whichPlayer = 'P1') {
      this.props.setPlayer('Player 1')
    }
    if(this.whichPlayer = 'P2') {
      this.props.setPlayer('Player 2')
    }
    socket.on('START', msg => this.startGame(msg))
  }
  
  startGame(msg) {
    if(msg === 'START') {
      console.log("Server says start")
      this.bindKeys()
      setInterval(this.gameLoop.bind(this), 1000 / 50)
      socket.on('in', (data) => this.fromServer(JSON.parse(data)))
      socket.on('p1s', (data) => this.score1FromServer(data))
      socket.on('p2s', (data) => this.score2FromServer(data))
    }
  }

  bindKeys() {
    if(this.whichPlayer === 'P1') {
      console.log(this.whichPlayer, 'keys')
      document.addEventListener('keyup', this.handleUp1.bind(this))
      document.addEventListener('keydown', this.handleDown1.bind(this))
    } 
    if (this.whichPlayer === 'P2') {
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
    return data
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
  
  score1FromServer(data) {
    if(data == null) {return}
    if(this.whichPlayer === "P2") {
      this.player1.score = data 
    }
  } 
  score2FromServer(data) {
    if(data == null) {return}
    if(this.whichPlayer === "P2") {
      this.player2.score = data
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

  player1Score() {
    this.player1.score++
    socket.emit('p1score', this.player1.score)
    // this.screen.ctx.fillRect(0, 0, this.screen.width, this.screen.height)
    // setTimeout(100, () => this.ball = new Ball(this.screen.width/2, this.screen.height/2, this.screen))
  }

  player2Score() {
    this.player2.score++
    socket.emit('p2score', this.player2.score)
    // this.screen.ctx.fillRect(0, 0, this.screen.width, this.screen.height)
    // setTimeout(100, () => this.ball = new Ball(this.screen.width/2, this.screen.height/2, this.screen))
    

  }

  update() {
    if(this.whichPlayer === 'P1') {
      this.player1.update()
      this.player2.checkCollision()
      var b = this.ball.update()
      if(b == 'P1') {
        this.player1Score()
      }
      if(b == 'P2') {
        this.player2Score()
      }
    }
    if(this.whichPlayer === 'P2') {
      this.player2.update()
      this.player1.checkCollision()
      // this.ball.checkCollision()
    }
  }

  gameRender() {
    this.screen.ctx.clearRect(1, 1, this.screen.width, this.screen.height)
    this.destCTX.clearRect(1, 1, this.screen.width, this.screen.height)
    this.screen.ctx.strokeStyle = 'yellow'
    this.screen.ctx.lineWidth = '6'
    this.screen.ctx.beginPath()
    this.screen.ctx.moveTo(1,1)
    this.screen.ctx.lineTo(1, this.screen.height)
    this.screen.ctx.lineTo((this.screen.width/2) - 2, this.screen.height)
    this.screen.ctx.lineTo((this.screen.width/2) - 2, 1)
    this.screen.ctx.lineTo(1,1)
    this.screen.ctx.stroke()
    this.screen.ctx.strokeStyle = '#4f5e68'
    this.screen.ctx.lineWidth = '6'
    this.screen.ctx.beginPath()
    this.screen.ctx.moveTo(this.screen.width/2  + 1,2)
    this.screen.ctx.lineTo(this.screen.width/2 + 1, this.screen.height)
    this.screen.ctx.lineTo(this.screen.width - 1, this.screen.height)
    this.screen.ctx.lineTo(this.screen.width - 1, 2)
    this.screen.ctx.lineTo(this.screen.width/2 + 1, 2)
    this.screen.ctx.stroke()

    this.screen.ctx.shadowBlur = 0
    this.screen.ctx.shadowOffsetX = 0
    this.screen.ctx.shadowOffsetY = 0
    this.screen.ctx.font = '50px ariel'
    this.screen.ctx.fillStyle = 'yellow'
    this.screen.ctx.fillText(this.player1.score, 400, 50)
    this.screen.ctx.fillStyle = '#4f5e68'
    this.screen.ctx.fillText(this.player2.score, 475, 50)
    this.ball.render()

    this.player1.render()
    this.player2.render()


    this.destCTX.drawImage(this.canvas, 0, 0)

  }

  gameLoop() {
    this.update()
    socket.emit(this.whichPlayer.toString(), JSON.stringify(this.sendToServer()))
    this.gameRender()
  }
  



  render () {
    return (
    <Segment color={'olive'} inverted tertiary>
      <div id="game-window">
        <canvas id="imCanvas" ref="dest" style={{'backgroundColor': '#24f2bf'}}/>
      </div>
    </Segment>
    
    )
  }
}

//, 'backgroundImage': 'url("https://www.transparenttextures.com/patterns/3px-tile.png")'

export default Game