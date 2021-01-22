import React, { useRef } from 'react';
import './css/App.css';
import Intro from './component/Intro'
import Menu from './component/Menu'
import Resume from './component/Resume'
import Game from './component/Game'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={comp:null}
  }
  selected=(comp)=>{
    this.setState({comp})
    // console.log("inside selected")
  }

  // translate = () => {
  //   if(window.location.pathname === "/portfolio")
  //     return (
  //
  //     )
  // }

  render(){
    return (
      <div className="app">
        <Menu/>
        <div className="resume-box">
          <Intro/>
          <Resume comp={this.state.comp}/>
        </div>
        <Game selected={this.selected}/>
      </div>
    );
  }
}

export default App;
