class Player {

  constructor(screen, color, isPlayer2, ball) {
    this.screen = screen
    this.width = screen.width/40
    this.height = screen.height/5
    this.ball = ball
    this.x =  (screen.width/8) - (this.width / 2)
    this.y = (screen.height/2) - (this.height / 2)
    this.dir = 0
    this.movespeed = 5
    this.color = color
    this.isPlayer2 = isPlayer2 

    if (isPlayer2) {
      this.x = this.screen.width - (screen.width/8) - (this.width / 2)
    } 

  }

  checkCollision(){
    if(this.y < 0) 
      this.y = 0
    if(this.y + this.height > this.screen.height) this.y = this.screen.height - this.height

    if(!this.isPlayer2)
      this.ball.checkPlayer1Collision(this.x, this.y, this.width, this.height)
    else
      this.ball.checkPlayer2Collision(this.x, this.y, this.width, this.height)
  }

  update() {

    if(this.dir == 1) {
      this.y += this.movespeed
    } else if(this.dir == -1) {
      this.y -= this.movespeed
    }
    this.checkCollision()
  }

  render() {
    this.screen.ctx.fillStyle = this.color
    this.screen.ctx.fillRect(this.x, this.y, this.width, this.height)
  }

}

export default Player