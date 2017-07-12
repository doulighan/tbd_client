class Screen {
  constructor(canvas, width, height) {
    this.canvas = canvas
    this.canvas.width = width
    this.canvas.height = height

    this.ctx = this.canvas.getContext('2d')
    // this.ctx.globalCompositeOperatio  = 'destination-out'

    this.width = width 
    this.height = height
  }
}

export default Screen