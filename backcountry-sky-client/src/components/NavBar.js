
import React, { Component }from "react";
import { Menu, Button } from 'semantic-ui-react'
import {Router, Route, NavLink, Switch } from 'react-router-dom';


class  NavBar extends Component{
  render() {
      console.log(this.props.currentUser)
    return (
      <div>
        <Menu inverted color="red" pointing secondary>
          <NavLink to="/" exact >
            <Menu.Item className="left aligned"
              name="About"/>
          </NavLink>
          <NavLink to="/home" exact>
            <Menu.Item className="left aligned"
              name="Explore"/>
          </NavLink>
          { !this.props.currentUser ?
              <Menu.Menu position="right">
                <NavLink to="/login" exact>
                  <Menu.Item  className="right aligned"
                    name="Login"/>
                </NavLink>
                <NavLink to="/signup" exact>
                  <Menu.Item  className="right aligned"
                    name="SignUp"/>
                </NavLink>
              </Menu.Menu>
              :
              <Menu.Menu position="right">
                  <Menu.Item>
                   {`Welcome, ${this.props.currentUser.name}!`}
                 </Menu.Item>
                 <Menu.Item onClick={this.props.logout}>
                   Log out
                 </Menu.Item>
                 <NavLink to="/profile" exact>
                   <Menu.Item  className="right aligned"
                     name="My Profile"/>
                 </NavLink>
               </Menu.Menu>
          }
          </Menu>
      </div>
    )
  }
}

export default NavBar;
