// import p5 from "react-p5";

function SingleRect(d){
  this.x = d.x;
  this.y = d.y;
  this.length = 110;
  this.width = 30;

  this.erase = () => {
    this.length = 0;
    this.width = 0;
  }

  this.show = (p5) =>{
    p5.strokeWeight(2);
    p5.stroke("#08fdd8")
    p5.fill("#222")
    p5.rect(this.x, this.y, this.length, this.width);
    p5.strokeWeight(0);
    p5.fill("#08fdd8")
    p5.text(d.str, this.x + 20, this.y + 20)
  }
}

export default SingleRect;
