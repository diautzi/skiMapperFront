import React from 'react';
import { Button } from 'semantic-ui-react';
import { NavLink } from "react-router-dom";

// import components
import WelcomeFooter from './WelcomeFooter';

// ABOUT CONTAINER

export default function Welcome() {
  return (
    <div>
      <div className='wrapper'>
        <p className='title'>WELCOME TO <span role="img" aria-label="Snowman">⛷️</span>SKIMAPPER!</p>
        <NavLink to="/trails" exact >
          <Button
            className="explore-button"
            size='huge'
            inverted
            color='black'
            content='Set focused'
          >
            Find your favourite trails!
          </Button>
        </NavLink>
      </div>
      <WelcomeFooter />
    </div>
    )
}
