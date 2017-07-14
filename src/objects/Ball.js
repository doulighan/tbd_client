const PI = Math.PI

class Ball {
  constructor(x, y, screen) {
    this.x = x 
    this.y = y 
    this.screen = screen
    this.dir = Math.PI + 1
    this.r = screen.width / 65
    this.movespeed = 5.5
  }

  update() {
    var xx = this.x + (this.movespeed * Math.cos(this.dir))
    var yy = this.y + (this.movespeed * Math.sin(this.dir))

    return this.checkCollision(xx, yy)
  }

  checkCollision(xx, yy) {
    var dd = this.dir
    if(xx < this.r) {
      this.dir = ((3/2) * PI) + (((3/2) * PI) - this.dir)
      this.x = this.r
      return 'P2'
    }
    if(xx > this.screen.width - this.r) {
      let a = this.dir - (PI * (3/2))
      this.dir = (PI * (3/2)) - a
      this.x = this.screen.width - this.r 
      return 'P1'
    }
    if(yy < this.r) {
      dd = (PI +(PI - this.dir))
      yy = this.r
    }
    if(yy > this.screen.height - this.r) {
      dd = (PI*2 - this.dir)
      yy = this.screen.height - this.r
    }
    if(dd === PI/2) dd = (PI/2) + .1
    if(dd === PI * (3/2)) dd = (PI * (3/2)) - .1

    this.x = xx
    this.y = yy
    this.dir = dd
  }

  checkPlayer1Collision(px, py, pw, ph) {
    if(this.x < px + pw + this.r && this.x > px + pw && this.y > py && this.y < py+ph) {
      this.dir = (((3/2) * PI) + (((3/2) * PI) - this.dir)) + Math.random() / 6
      this.x = px + pw + this.r
      if(this.y > py + (ph / 3) && this.y < py + ph - (ph / 3)) {
        this.dir = 0 
      }
      else if(this.y > py && this.y < py + (ph / 4)) {
          this.dir = (-(PI/6))

      }else if(this.y < py + ph && this.y > py + ph - (py / 4)) {
          this.dir = (PI/6) - Math.random() / 10
      }
    }
    if(this.x > px - this.r && this.x < px + this.r && this.y > py && this.y < py+ph) {
      let a = this.dir - (PI * (3/2))
      this.dir = (PI * (3/2)) - a
      this.x = px - this.r 
    } 
  }

  checkPlayer2Collision(px, py, pw, ph) {
    if(this.x < px + pw + this.r && this.x > px + pw && this.y > py && this.y < py+ph) {
      this.x = px + pw + this.r 
      if(this.y - py < ph / 2) {
        ((this.y - py) / py) * (PI / 4)
      }
      this.dir = ((3/2) * PI) + (((3/2) * PI) - this.dir) + (Math.random() / 6)
    }
    if(this.x > px - this.r && this.x < px + this.r && this.y > py && this.y < py+ph) {
      let a = this.dir - (PI * (3/2))
      this.dir = ((PI * (3/2)) - a) + Math.random() / 10
      this.x = px - this.r 
      if(this.y > py + (ph / 3) && this.y < py + ph - (ph / 3)) {
        this.dir = PI + (Math.random() / 10)
      }else if(this.y > py && this.y < py + (ph / 4)) {
          this.dir = (PI + (PI/7)) + (Math.random() / 10)
      }else if(this.y < py + ph && this.y > py + ph - (py / 4)) {
          this.dir = (PI - (PI/7))
      }
    } 
  }
  render() {
    this.screen.ctx.shadowBlur = 0
    this.screen.ctx.shadowOffsetX = 1
    this.screen.ctx.shadowOffsetY = 1
    this.screen.ctx.lineWidth =  1
    this.screen.ctx.moveTo(this.x, this.y)
    this.screen.ctx.beginPath()
    this.screen.ctx.arc(this.x, this.y, this.r, 0, PI * 2, false)
    this.screen.ctx.closePath()
    this.screen.ctx.strokeStyle = "#cccccc"
    this.screen.ctx.fillStyle = 'white'
    this.screen.ctx.stroke()
    this.screen.ctx.fill()
  } 
}

export default Ball