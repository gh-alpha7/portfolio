import React, { useRef } from 'react';
import '../css/resume.css';
import Particles from 'react-particles-js';
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
    console.log(this.props.comp, "render")
    let component = this.props.comp == "EXPERIENCE"?<Experience/>: this.props.comp == "EDUCATION"? <Education/>: this.props.comp == "PROJECT"? <Project/>: this.props.comp == "INTERESTS"? <Interests/>: this.props.comp == "SKILLS"? <Skills/>: null;
    return (
      <div className="resume">
      <div className="resume-div">
        {component}
      </div>
      <Particles
        params={data} />
      </div>
    );
  }
}

export default Resume;
