// import p5 from "react-p5";

function Board(height, width){
  this.default_x = width/2 - 45;
  this.default_y = height - 20;
  this.x = width/2 - 45;
  this.y = height - 20;
  this.vel = 3;
  this.length = 90;
  this.width = 15;

  this.move = (left) =>{
    this.x += left * this.vel;
    // console.log(this.x, this.y)
  }

  this.reset = () => {
    this.x = this.default_x;
    this.y = this.default_y;
  }

  this.show = (p5) =>{
    p5.fill("#08fdd8")
    p5.rect(this.x, this.y, this.length, this.width);
  }
}

export default Board;
