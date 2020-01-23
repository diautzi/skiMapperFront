
import React, { Component } from "react";
import style from "../App.css";
import { Button, Card, Image } from "semantic-ui-react"
import TrailDetails from "../components/TrailDetails"
import { NavLink } from 'react-router-dom';
import UpdateProfile from "../containers/UpdateProfile"

class Profile extends Component {

  state = {
    myTrails: [],
    currentUser: this.props.currentUser
  }

  createdAt = (date) => {
   let d = new Date(date)
   let monthNames = [
     "Jan", "Feb", "Mar",
     "Apr", "May", "Jun", "Jul",
     "Aug", "Sep", "Oct",
     "Nov", "Dec"
   ];

   let day = d.getDate();
   let monthIndex = d.getMonth();
   let year = d.getFullYear();

   return day + ' ' + monthNames[monthIndex] + ' ' + year;
 }

  componentDidMount() {
  fetch("http://localhost:3000/api/v1/completed_trails")
  .then(resp => resp.json())
  .then(favTrails => this.setState({
    myTrails: favTrails.filter(trail => trail.user_id == this.props.currentUser.id)
  }))
  }


  deleteAccount = (userId) => {
    let id = userId
    id = `${this.props.currentUser.id}`
    console.log(id)
    fetch(`http://localhost:3000/api/v1/users/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify({
        id: id
        })
      })
    .then(resp => resp.json())
    .then(data => this.props.logout(data))
    this.props.history.push("/login")
  }

  deleteTrail = (id) => {
    fetch(`http://localhost:3000/api/v1/completed_trails/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify({
        id: id
        })
      })
      .then(resp => resp.json())
      .then(res => this.setState({
        myTrails: this.state.myTrails.filter(trail => trail.id !== id)
      }))
  }


  render() {
   const currentUser = this.props.currentUser;
   let userImage;
    if (!!currentUser.image) {
      userImage = currentUser.image;
    } else {
      userImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuz4ys13YZ-pwKXvCP-Hq_39sU9ZhHhM-JLPreXfAOHQKvzzcl';
    }

    return (
      <div>
        <div style={{textAlign: "center"}}>
          <div className='profile-container'>
            <img className="profile-pic" src={ userImage } alt="Add-a-profile-pic" />
            <div className='user-data'>
              <div className="name">{currentUser.name}</div><br></br>
              <div className="user-location" > 🌎 { currentUser.location ? currentUser.location : "" } </div><br></br>
              <div className="user-registration-date">Member since: { this.createdAt(currentUser.created_at) }</div>
                <div className="user-registration-date"> Conquered: { this.state.myTrails.length} Peaks </div>
              <br></br>
              <Card.Content extra>
                <div >
                <NavLink to="/edit" exact>
                  <Button  size='large'  color='green'>
                    Update Account
                  </Button>
                </NavLink>
                  <Button size="large" color='red' onClick={(e) => this.deleteAccount(e)}>
                   Delete Account
                  </Button>
                </div>
              </Card.Content>
              {this.state.myTrails.length > 0 ? <h3 className="name">My favorite Trails</h3> : ""}
            </div>
          </div>
        </div>
        {this.state.myTrails.map(trail =>
          <div class="ui centered card">
            <Card
                image={trail.trail_image}
                header={trail.trail_name} />
            <Button inverted onClick={() => this.deleteTrail(trail.id)}> Delete </Button>
        </div>)}
      </div>
    )
  }
}

export default Profile;
