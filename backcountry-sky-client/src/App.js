import React, { Component } from 'react';
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// import components
import About from "./components/About";
import Login from "./containers/Login";
import MainContainer from "./containers/MainContainer";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import Signup from "./containers/Signup";
import TrailDetails from "./components/TrailDetails";
import UpdateProfile from "./containers/UpdateProfile";

class App extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      currentUser: '',
      myTrails: []
    }
  }

  componentDidMount(){
    let token = localStorage.getItem("token");
    if(token){
      fetch(`https://serene-lake-00689.herokuapp.com//api/v1/current_user`, {
        headers: {
          "Authorization": token
        }
      })
      .then(res => res.json())
      .then((response) => {
        this.setState({
          currentUser: response
        })
      })
    }
  };

  signup = ({ name, email, image, location, password, passwordConfirmation }) => {
    // if (password === passwordConfirmation) {
    fetch("https://serene-lake-00689.herokuapp.com//api/v1/users", {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        image: image,
        location: location,
        password: password
      })
    })
    .then(res => res.json())
    .then((response) => {
      if (response.errors) {
        alert(response.errors)
      } else {
        localStorage.setItem("token", response.token)
        this.setState({
          currentUser: response.user
        })
        this.props.history.push("/profile")
      }
    })
  };

  logout = () => {
    this.setState({
      currentUser: null
    })
    localStorage.removeItem("token")
    this.props.history.push("/login")
  };

  login = (email, password) => {
    fetch("https://serene-lake-00689.herokuapp.com/api/v1/login", {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(resp => resp.json())
    .then(response => {
      if (response.errors) {
        alert(response.errors)
      } else {
        localStorage.setItem("token", response.token)
        this.setState({
          currentUser: response.user
        })
        this.props.history.push("/profile")
      }
    })
  };

  updateProfile = (e, id) => {
    e.preventDefault();
    id = `${this.props.currentUser.id}`
    // console.log(id)
    fetch(`https://serene-lake-00689.herokuapp.com/api/v1/users/${id}`, {
      method: "PATCH", mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        // "Access-Control-Allow-Origin" :"https://serene-lake-00689.herokuapp.com"
      },
      body: JSON.stringify({
        name: this.state.name,
        image: this.state.image,
        location: this.state.location,
        email: this.state.email
      })
    })
      .then(resp => resp.json())
      .then(resp => this.setState({
        currentUser: resp
      }))
    this.props.history.push("/profile")
  };

  render() {
    return (
      <div className="App">
        <NavBar currentUser={this.state.currentUser} logout={this.logout}/>
        <Switch>
          <Route exact path="/"  component={About} />
          <Route exact path="/trails" render={(props) => <MainContainer /> } />
          <Route exact path="/trail/:id" render={(props) => <TrailDetails {...props} currentUser={this.state.currentUser} users={this.state.users}/>} />
          <Route exact path="/login" render={(props) => <Login {...props}  login={this.login} /> } />
          <Route exact path="/signup" render={(props) => <Signup {...props} signup={this.signup} /> } />
          <Route exact path="/edit" render={(props) => <UpdateProfile {...props} currentUser={this.state.currentUser} updateProfile={this.updateProfile} />} />
          <Route exact path="/:username" render={(props) => <Profile {...props} currentUser={this.state.currentUser} logout={this.logout} /> } />
        </Switch>
       </div>
    );
  };
};

export default withRouter(App);
