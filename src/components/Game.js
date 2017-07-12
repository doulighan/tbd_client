import React from 'react'
import Timer from './Timer'
import Player from '../objects/Player'
import Screen from '../objects/Screen'
import Ball from '../objects/Ball'

class Game extends React.Component {

  constructor(props) {
    const WIDTH = 650
    const HEIGHT = WIDTH / 1.625
    super(props)
    this.canvas = document.getElementById('canvas')
    console.log(this.canvas)
    this.screen = new Screen(this.canvas, WIDTH, HEIGHT)
    this.ball = new Ball(this.screen.width/2, this.screen.height/2, this.screen)
    this.player1 = new Player(this.screen, "blue", false, this.ball)
    this.player2 = new Player(this.screen, "red", true, this.ball)
  }


  componentDidMount() {
    document.addEventListener('keyup', this.handleUp1.bind(this))
    document.addEventListener('keydown', this.handleDown1.bind(this))
    document.addEventListener('keyup', this.handleUp2.bind(this))
    document.addEventListener('keydown', this.handleDown2.bind(this))
    setInterval(this.gameLoop.bind(this), 1000 / 60)
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
  }

  gameRender() {
    this.screen.ctx.clearRect(0, 0, this.screen.width, this.screen.height)
    this.player1.render()
    this.player2.render()
    this.ball.render()
    this.forceUpdate()  
  }

  gameLoop() {
    this.update()
    this.gameRender()
  }



  render () {
    return (
      <div>
        <h3>y: {this.player1.y} </h3>
      </div>
    )
  }
}

export default Game