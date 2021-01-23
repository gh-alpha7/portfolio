// import p5 from "react-p5";

function Ball(height, width){
  this.default_x = width/2;
  this.default_y = height - 30;

  this.x = width/2;
  this.y = height - 30;
  this.x_vel = -2;
  this.y_vel = -2;
  this.vel = 3;
  this.moving = 0;
  this.radius = 20;
  this.alive = 1;

  this.move = () =>{
    this.x += this.x_vel;
    this.y += this.y_vel;
  }

  this.horizMove = (left) =>{
    this.x += left * this.vel;
  }

  this.reset = () => {
    this.x_vel = -2;
    this.y_vel = -2;
    this.x = this.default_x;
    this.y = this.default_y;
  }

  this.update = (x, y)=>{
    this.x_vel = x;
    this.y_vel = y;
    this.move();
  }

  this.show = (p5) =>{
    p5.fill("#08fdd8")
    p5.ellipse(this.x, this.y, this.radius);
  }
}

export default Ball;
