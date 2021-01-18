// import logo from './logo.svg';
import React, { useRef } from 'react';
import '../css/atari.css';

class Atari extends React.Component {
  constructor(props){
    super(props);
    this.state = {x_axis:190, prev_x : 120, ball_x : 229, ball_y: 390, prev_ball_x : 249, prev_ball_y : 390, prev_xv:-1, prev_yv:-1, started: false}
    this.original_state = {...this.state}
    this.bound = {left_wall : 16, right_wall : 440, top_wall : 5, down_wall : 430}
    this.ctx = null;
    this.height = this.width = null;
    this.interval = null;
    this.rect = [];
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d");
    this.ctx = ctx;
    this.width = canvas.width;
    this.height = canvas.height;
    this.reset()
    // console.log(canvas.width, canvas.height)
    // ctx.beginPath();
  }

  reset = () =>{
    this.rect = []
    this.setState(this.original_state)
    if(this.interval) clearInterval(this.interval);
    this.ctx.clearRect(0, 0, this.width, this.height);
    setTimeout(()=>{
      this.drawBall();
      this.drawBoard();
      this.drawRect();
    }, 100)
  }

  drawRect = () => {
    // console.log("drawRect")
    let ctx = this.ctx;
    let col = ["INTERESTS", "EDUCATION", "PROJECTS", "SKILLS", "EXPERIENCE"]
    for (var i = 0; i < 4; i++) {
      let x = 0;
      x = Math.floor(Math.random() * 5);
      if(i == 2) x = Math.floor(Math.random() * 3);
      for (var j = 0; j < 5; j++) {

        ctx.strokeStyle = 'rgb(0, ' + Math.floor(255 - 42.5 * i) + ', ' +
                           Math.floor(255 - 42.5 * j) + ')';
        // ctx.fillStyle = ctx.strokeStyle;
        ctx.beginPath();
        // ctx.lineWidth = 2;
        let obj = {axis:[], filled:false}
        if(j == x){
          ctx.fillText(col[i], 15 + j * 90+10, 25 + i * 35+18)
          obj.filled = col[i];
        }
        if(i == 2 && j == 4){
          ctx.fillText(col[4], 15 + j * 90+10, 25 + i * 35+18)
          obj.filled = col[4];
        }
        ctx.rect(15 + j * 90 , 25 + i * 35, 78, 30);
        obj.axis=[15 + j * 90, 25 + i * 35];
        this.rect.push(obj);
        ctx.stroke();
        // ctx.fill();
      }
    }
  }

  drawBoard=()=>{
    let ctx = this.ctx;
    ctx.clearRect(this.state.prev_x, 398, 78, 17);
    const color = '#08fdd8';
    ctx.beginPath();
    ctx.rect(this.state.x_axis,400,75,15);
    ctx.fillStyle = color;
    ctx.fill();
  }

  drawBall=()=>{
    let ctx = this.ctx;
    // ctx.clearRect(this.state.prev_ball_x-10, this.state.prev_ball_y-10, 20, 20);
    ctx.fillStyle = "#222";
    ctx.beginPath();
    ctx.arc(this.state.prev_ball_x, this.state.prev_ball_y, 8.7, 0, Math.PI * 2, true);
    ctx.fill()
    ctx.fill()
    ctx.fillStyle = "#08fdd8";

    ctx.beginPath();
    ctx.arc(this.state.ball_x, this.state.ball_y, 8, 0, Math.PI * 2, false);
    ctx.fill()
  }

  handleKeyDown = (e) =>{
    // console.log(e.keyCode)
    let x = 5;
    console.log(e.keyCode)
    if(e.keyCode == "37"){
      if(this.state.x_axis < 16) return;
      let x_axis = this.state.x_axis;
      let prev_x = x_axis;
      x_axis-= 5;
      this.setState({x_axis, prev_x})
      this.drawBoard();
      if(!this.state.started){
        let ball_x = this.state.ball_x;
        let prev_ball_x = ball_x;
        ball_x -= 5;
        this.setState({ball_x, prev_ball_x})
        this.drawBall();
      }
    }
    else if(e.keyCode == "39"){
      if(this.state.x_axis > this.width - 95) return
      let x_axis = this.state.x_axis;
      let prev_x = x_axis-2;
      x_axis+= 5;
      this.setState({x_axis, prev_x})
      this.drawBoard();
      if(!this.state.started){
        let ball_x = this.state.ball_x;
        let prev_ball_x = ball_x;
        ball_x += 5;
        this.setState({ball_x, prev_ball_x})
        this.drawBall();
      }
    }
    else if(e.keyCode == "13"){
      if(this.state.started == false){
        this.setState({started:true})
        this.interval = setInterval(this.play, 10);
      }
    }
  }

  collission = () =>{
    // console.log(this.state.ball_y, this.state.y_axis, this.state.ball_x-4, this.state.ball_x + 76)
    if(this.state.ball_y >= 10 && this.state.ball_y <= 220 && this.state.ball_x >= 20 && this.state.ball_x <= 420){
      this.rect.map((d, ind)=>{
        let axis = d.axis, filled = d.filled;
        if(this.state.ball_x+10 >= d.axis[0] && this.state.ball_x <= d.axis[0] + 79 && this.state.ball_y <= d.axis[1] + 31 && this.state.ball_y >= d.axis[1]){
          this.ctx.clearRect(d.axis[0]-5, d.axis[1]-4, 78+8, 30+8);

          this.rect.splice(ind, 1);
          if(this.state.ball_y == d.axis[1])                  //top
            this.move("x", this.state.prev_yv * -1);
          if(this.state.ball_x+10 == d.axis[0])                  //left
            this.move(this.state.prev_xv * -1, 'x');
          if(this.state.ball_x == d.axis[0] + 79)             //right
            this.move(this.state.prev_xv * -1, 'x');
          if(this.state.ball_y == d.axis[1] + 31)             //bottom
            this.move("x", this.state.prev_yv * -1);
          if(d.filled){
            this.props.callback(d.filled);
            this.resetBoard();
          }

        }

      })
    }
    else if(this.state.ball_x <= this.bound.left_wall) this.move(this.state.prev_xv * -1, 'x');
    else if(this.state.ball_y <= this.bound.top_wall) this.move('x', this.state.prev_yv * -1);
    else if(this.state.ball_x >= this.bound.right_wall) this.move(this.state.prev_xv * -1, 'x');
    else if(this.state.ball_y == 390 && (this.state.ball_x >= this.state.x_axis-4 && this.state.ball_x <= this.state.x_axis + 76)) this.move('x',this.state.prev_yv * -1)
    else if(this.state.ball_y > 390 && (this.state.ball_x >= this.state.x_axis-8 && this.state.ball_x <= this.state.x_axis + 80)) this.move(this.state.prev_xv*-1,'x')
    else if(this.state.ball_y >= this.bound.down_wall) this.resetBoard();
  }

  resetBoard= () =>{
    clearInterval(this.interval);
    let ctx = this.ctx;
    ctx.clearRect(this.state.prev_ball_x-10, this.state.prev_ball_y-10, 20, 20);
    ctx.clearRect(0, 300, this.bound.right_wall, this.bound.down_wall);
    // setTimeout(()=>{
      this.setState(this.original_state);
      this.drawBoard();
      this.drawBall();
    // }, 500)
  }

  play = () => {
      this.move(this.state.prev_xv, this.state.prev_yv)
      this.collission();
  }

  move = (x, y) =>{
    if(y == 'x') y = this.state.prev_yv
    if(x == 'x') x = this.state.prev_xv
    let ball_x = this.state.ball_x+x, ball_y = this.state.ball_y+y;
    this.setState({ball_x, ball_y, prev_ball_x : ball_x-x, prev_ball_y : ball_y-y, prev_xv: x, prev_yv: y})
    this.drawBall();
  }


  render(){
    return (
      <div className="atari">
        <canvas ref="canvas" height={422} width={457}/>
      </div>
    );
  }
}

export default Atari;
