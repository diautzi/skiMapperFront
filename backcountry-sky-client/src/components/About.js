
import React, { Component } from "react";
import { Button } from 'semantic-ui-react';
import { NavLink } from "react-router-dom";



class  About extends Component {

  render() {
    return(
      <div className="about">
        <h1 style={{color: "red", textAlign: "center"}}>"LIVE YOUR LIFE, AND ENJOY LIVING IT"</h1>
        <NavLink to="/home" exact >
          <Button center color="red" > Start your adventure </Button>
        </NavLink>
      </div>
    )
  }
}

export default About;
