// import logo from './logo.svg';
import '../css/intro.css';
import S from '../s.png'

function Intro() {
  return (
    <div className="intro">
      <div className="intro-div">
        <h1 className="intro-hi">Hi,</h1>
        <h1 className="intro-hi name">I'm </h1>
        <img className="image_s name" src={S}/>
        <h1 className="intro-hi name">ubham,</h1>
        <h1 className="intro-hi">Developer.</h1>
      </div>
    </div>
  );
}

export default Intro;
