import React, { Component }from "react";
import { Menu, Segment } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class  NavBar extends Component{
  constructor(props) {
    super(props)
    this.state = {
    activeItem: "home"
    }
  };

  handleItemClick = (e, { name }) => this.setState({
    activeItem: name
  });

  render() {
    return (
      <Segment inverted vertical>
        <Menu inverted pointing secondary>
          <Menu.Item>
            <NavLink to="/" exact className="item">
              About
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/trails" exact className="item">
              Trails
            </NavLink>
          </Menu.Item>
          {this.props.currentUser ?
            <Menu.Menu position="right">
              <Menu.Item onClick={this.props.logout}>
                {/* <NavLink className="item" >
                  Log out
                </NavLink> */}
              </Menu.Item>
              <Menu.Item>
                <NavLink to="/profile" exact className="item">
                  My Profile
                </NavLink>
              </Menu.Item>
            </Menu.Menu>
            :
            <Menu.Menu position="right" className="item">
              <Menu.Item>
                <NavLink to="/login" exact className="item">
                  Login
                </NavLink>
              </Menu.Item>
              <Menu.Item>
                <NavLink to="/signup" exact className="item">
                  SignUp
                </NavLink>
              </Menu.Item>
            </Menu.Menu>
          }
        </Menu>
      </Segment>
    );
  };
};

export default NavBar;