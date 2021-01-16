// import logo from './logo.svg';
import '../css/menu.css';
import S from '../s.png'
import '../css/font-awesome/css/font-awesome.min.css';
function Menu() {
  return (
    <div className="menu">
      <div className="logo_div">
        <img className="nav_logo" src ={S}/>
      </div>
      <div className="icon_div">
        <i className="icon-cost fa fa-home"></i>
      </div>
      <div className="contact">
        <a className="contact-a" href="https://www.facebook.com/profile.php?id=100002494420268"><i className="fa fa-facebook-f"></i></a>
        <a className="contact-a" href="https://www.linkedin.com/in/subham-kumar-singh-853728108/"><i className="fa fa-linkedin"></i></a>
      </div>
    </div>
  );
}

export default Menu;
