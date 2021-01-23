// import logo from './logo.svg';
import React, { useRef } from 'react';
import '../css/atari.css';
import Ball from './components/Ball'
import Board from './components/Board'
import Rectangle from './components/Rectangle'
import SingleRect from './components/SingleRect'
import Sketch from "react-p5";

class Atari extends React.Component {
  constructor(props){
    super(props);
    this.height = 0;
    this.width = 0;
    this.frameRate = 90;
    this.left_wall = 20;
    this.right_wall = 0;
    this.top_wall = 10;
    this.down_wall = 0;
    this.length = 110;
    this.width = 30;
  }
  componentDidMount() {
    this.width = document.getElementById('atari').clientWidth;
    this.height = document.getElementById('atari').clientHeight;
    console.log(this.width, this.height)
    this.right_wall = this.width - 10;
    this.down_wall = this.height;
  }

  setup = (p5, canvasParentRef) => {
    p5.createCanvas(this.width, this.height).parent(canvasParentRef);
    this.ball = new Ball(this.height, this.width);
    this.board = new Board(this.height, this.width);
    this.rect = new Rectangle(this.width, this.height);
    this.rect.createBrick();

    p5.frameRate(this.frameRate)
  };

  resizePix = () =>{
    this.board.default_x = this.width/2 - 45;
    this.board.default_y = this.height - 20;
    this.board.x = this.width/2 - 45;
    this.board.y = this.height - 20;
    this.ball.default_x = this.width/2;
    this.ball.default_y = this.height - 30;
    this.ball.x = this.width/2;
    this.ball.y = this.height - 30;
    this.rect.width = this.height/12;
    this.rect.length = this.width/5;
  }

  draw = (p5) => {
    p5.background("#222");
    this.width = document.getElementById('atari').clientWidth;
    this.height = document.getElementById('atari').clientHeight;
    this.ball.show(p5);
    this.board.show(p5);
    this.rect.show(p5);

    if(this.ball.moving){
      this.ball.move();
      this.collission(p5);
    }
    this.keyPress(p5);
  };

  keyPress = (p5) =>{
    if(p5.keyIsDown(p5.LEFT_ARROW)){
      if(this.board.x > this.left_wall){
        this.board.move(-1);
        if(!this.ball.moving) this.ball.horizMove(-1);
      }
    }
    else if(p5.keyIsDown(p5.RIGHT_ARROW)){
      if(this.board.x < this.right_wall - this.board.length){
        this.board.move(1);
        if(!this.ball.moving) this.ball.horizMove(1);
      }
    }
    else if(p5.keyIsDown(p5.ENTER)){
      this.ball.moving = 1;
    }
  }


  collission = (p5) =>{
    if(this.ball.y <= this.height/2)
    this.rect.rect_.map((d, ind)=>{
      let left = Math.floor(d.x)-10, top = Math.floor(d.y)-10, bottom = Math.floor(d.y + this.height/14)+10, right = Math.floor(d.x + this.width/6)+10;
      let x = this.ball.x + Math.floor(this.ball.radius/2), y = this.ball.y + Math.floor(this.ball.radius/2);
      if(this.ball.x >= left && this.ball.x <= right && this.ball.y >= top && this.ball.y <= bottom){
        console.log(left, top, right, bottom, this.ball.x+1, this.ball.y+1)
        // console.log(this.ball.y, this.ball.x, d.x,d.y,this.height/14, this.width/6)
        // this.rect.rect_ = []
        this.rect.rect_.splice(ind, 1);
        if(d.str != "") {
          this.reset(p5)
          this.props.callback(d.str)
          return
        }

        if(this.ball.y  <= d.y || this.ball.y >= d.y + this.height/14)                  //top
          this.ball.y_vel *= -1;
        else if(this.ball.x <= d.x || this.ball.x >= d.x + this.width/6 )                  //left
          this.ball.x_vel *= -1;
      }
    })
    if(this.ball.x <= this.left_wall)
      this.ball.x_vel*=-1;
    else if(this.ball.y <= this.top_wall)
      this.ball.y_vel *= -1;
    else if(this.ball.x >= this.right_wall)
      this.ball.x_vel *= -1;
    else if(this.ball.y + 6 == this.board.y && this.ball.x >= this.board.x-10 && this.ball.x <= this.board.x+this.board.length+10)
      this.ball.y_vel *= -1;
    else if(this.ball.y >= this.down_wall)
      this.reset(p5)
  }

  reset = () => {
    console.log("reset")
    this.ball.moving = 0;
    this.ball.reset();
    this.board.reset();
  }

  resetButton = () =>{
    this.ball = new Ball(this.height, this.width);
    this.board = new Board(this.height, this.width);
    this.rect = new Rectangle();
    this.rect.createBrick();
  }

  pressStart = () =>{
    this.ball.moving = 1;
  }

  windowResized =(p5)=> {
    this.width = document.getElementById('atari').clientWidth;
    this.height = document.getElementById('atari').clientHeight;
    p5.resizeCanvas(this.width, this.height);
    this.resizePix();
  }


  render(){
    return (
      <div className="atari" id = "atari">
        <Sketch setup={this.setup} draw={this.draw} windowResized = {this.windowResized}/>
      </div>
    );
  }
}

export default Atari;
