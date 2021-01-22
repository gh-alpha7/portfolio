import React, { useRef } from 'react';
import '../css/buttons.css';
import Atari from '../Game/Atari';
import Header from '../Game/Header';
import Buttons from '../Game/Buttons';

class Game extends React.Component {
  filledClick = (rect) =>{
    // console.log("inside filled", rect)
    this.props.selected(rect);
  }

  startClick = ()=>{

  }
  render(){
    return (
      <div className="game">
        <Header/>
        <Atari callback={this.filledClick} ref={instance => { this.atari = instance; }}/>
        <Buttons onStart={() => this.atari.pressStart()} onReset={()=> this.atari.resetButton()}/>
      </div>
    );
  }
}

export default Game;
