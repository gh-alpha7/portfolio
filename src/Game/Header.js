// import logo from './logo.svg';
import '../css/game.css';
import S from '../s.png'
import Particles from 'react-particles-js';
import data from '../particlesjs-config'

function Intro() {
  return (
    <div className="header">
        <code>if(not_in_hurry)</code>
        <code className="tab_code inline_code">play_around(<a className="link" href=""></a>);</code>
        <code className="inline_code comment">//press enter</code>
        <code>else</code>
        <code className="tab_code">download_resume(<a className="link" href="https://github.com/subh1685/tictac/raw/master/Subham's%20Resume%20wal.pdf">download</a>);</code>

        <Particles
          params={data} />
    </div>
  );
}

export default Intro;
