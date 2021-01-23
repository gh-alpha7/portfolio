// import p5 from "react-p5";
import SingleRect from './SingleRect'
function Rectangle(width, height){
  this.row = 4;
  this.col = 5;
  this.left = 10;
  this.top = 10;
  this.wide = width;
  this.height = height;
  this.width = height/12;
  this.length = width/5;
  this.rect_text = [{index: [0,0]}, {index: [1,2]}, {index: [1,4]}, {index: [2,3]}, {index: [3,1]}];
  this.rect_ = [];
  this.vis = 0;
  this.erase = () => {
    this.length = 0;
    this.width = 0;
  }

  this.createBrick = () =>{
    let sections = ["EXPERIENCE", "INTERESTS", "EDUCATION", "PROJECTS", "SKILLS"]
    let ind = 0;
    for(let i = 0; i < this.row; i++){
      let x = this.left, y = this.top + this.width * i;
      for(let j = 0; j < this.col; j++){
        let str = "";
        if(ind <= 4 && i === this.rect_text[ind].index[0] && j === this.rect_text[ind].index[1]){
          str = sections[ind];
          ind++;
        }
        this.rect_.push({x,y,str});
        // console.log(x,y)
        x += this.length;
      }
    }
  }

  this.show = (p5) => {
    this.rect_.map(d=>{
      let rect = new SingleRect(this.wide, this.height, d);
      rect.show(p5);
    })
  }
}

export default Rectangle;
