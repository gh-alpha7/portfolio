import React from 'react';
import '../css/resume.css';
// import Particles from 'react-particles-js';
import data from '../particlesjs-config'
import Interests from '../Resume/Interests'
import Skills from '../Resume/Skills'
import Experience from '../Resume/Experience'
import Education from '../Resume/Education'
import Project from '../Resume/Project'

class Resume extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    let component = this.props.comp === "EXPERIENCE"?<Experience/>: this.props.comp === "EDUCATION"? <Education/>: this.props.comp === "PROJECTS"? <Project/>: this.props.comp === "INTERESTS"? <Interests/>: this.props.comp === "SKILLS"? <Skills/>: <Experience/>;
    return (
      <div className="resume">
      <div className="resume-div">
        {component}
      </div>
      </div>
    );
  }
}

export default Resume;
