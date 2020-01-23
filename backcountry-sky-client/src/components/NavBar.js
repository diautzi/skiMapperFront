
import React, { Component }from "react";
import { Menu, Button, Segment} from 'semantic-ui-react'
import {Router, Route, NavLink, Switch } from 'react-router-dom';


class  NavBar extends Component{

  state = {
    activeItem: "home"
  }

  handleItemClick = (e, {name}) => this.setState({
    activeItem: name
  })

  render() {
    const { activeItem } = this.state
    return (
      <Segment inverted vertical>
        <Menu inverted color="red" pointing secondary>
          <NavLink to="/" exact className="item">About</NavLink>
          <NavLink to="/home" exact className="item">Explore</NavLink>
          { !this.props.currentUser ?
              <Menu.Menu position="right" className="item">
                <NavLink to="/login" exact lassName="item">Login</NavLink>
                <NavLink to="/signup" exact className="item">SignUp</NavLink>
              </Menu.Menu>
              :
              <Menu.Menu position="right">
                  <Menu.Item>
                   {`Welcome, ${this.props.currentUser.name}!`}
                 </Menu.Item>
                 <NavLink className="item" onClick={this.props.logout}>
                   Log out
                 </NavLink>
                 <NavLink to="/profile" exact className="item">My Profile</NavLink>
              </Menu.Menu>}
        </Menu>
      </Segment>
    )
  }
}

export default NavBar;
