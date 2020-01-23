import React, { Component } from "react";
import { Button } from 'semantic-ui-react';
import { NavLink } from "react-router-dom";
import style from "../App.css"



class  About extends Component {

    render() {
      return(
        <div class="about">
          <h1>WELCOME TO ⛷️MAPPER! </h1>
          <h2>"LIVE YOUR LIFE, AND ENJOY LIVING IT"</h2>
          <NavLink
            to="/home" exact >
          <Button
            className="explore-button"
            size='huge'
            inverted
            color='black'
            content='Set focused' >Start your adventure
          </Button>
          </NavLink>
        </div>
        )
      }
    }

export default About;
