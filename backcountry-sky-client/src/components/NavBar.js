
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
      console.log(this.props.currentUser)
    const { activeItem } = this.state
    return (
      <div>
        <Menu inverted color="red" pointing secondary>
          <NavLink to="/" exact className="item">
            <Menu.Item className="left aligned"
              name="About"/>
          </NavLink>
          <NavLink to="/home" exact className="item">
            <Menu.Item className="left aligned"
              name="Explore"/>
          </NavLink>
          { !this.props.currentUser ?
              <Menu.Menu position="right" className="item">
                <NavLink to="/login" exact className="item" className="item">
                  <Menu.Item  className="right aligned"
                    name="Login"/>
                </NavLink>
                <NavLink to="/signup" exact className="item">
                  <Menu.Item  className="right aligned"
                    name="SignUp"/>
                </NavLink>
              </Menu.Menu>
              :
              <Menu.Menu position="right">
                  <Menu.Item>
                   {`Welcome, ${this.props.currentUser.name}!`}
                 </Menu.Item>
                 <Menu.Item  className="item" onClick={this.props.logout}>
                   Log out
                 </Menu.Item>
                 <NavLink to="/profile" exact className="item">
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
