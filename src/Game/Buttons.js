import React, { useRef } from 'react';

import '../css/game.css';
import S from '../s.png'

class Button extends React.Component {

  render(){
    return (
      <div>
        <div className="button">
          <a className="flat-button" onClick={()=>{this.props.onStart()}}> Start </a>
          <a className="reset_button flat-button" onClick={()=>{this.props.onReset()}}> Reset </a>
        </div>
      </div>
    );
  }
}

export default Button;
