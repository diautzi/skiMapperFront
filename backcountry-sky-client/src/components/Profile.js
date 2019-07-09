
import React, { Component } from "react";
import style from "../App.css";
import { Button, Card, Image } from "semantic-ui-react"
import TrailDetails from "../components/TrailDetails"

class Profile extends Component {

  state = {
    myTrails: []
  }

  difficulty = () => {
    let level;
    if (this.state.myTrails.difficulty === "blue") {
      level = "Blue";
    } else if (this.state.trail.difficulty === "greenBlue") {
      level = "Intermediate Green";
    } else if (this.state.trail.difficulty === "blueBlack") {
      level = "Intermediate Blue";
    } else if (this.state.trail.difficulty === "black") {
      level = "Black 🔷";
    } else if (this.state.trail.difficulty === "dblack") {
      level = "Double Black 🔷";
    } else if (this.state.trail.difficulty === "green") {
      level = "Easy"
    } else {
      level = "N/A"
    }
    return level;
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

  // displayFavoriteTrail = () => {
  //   {this.state.myTrails.map(data =>
  //     <Card>
  //       <Image src=`${data.trail_image}` wrapped ui={false} />
  //       <Card.Content>
  //         <Card.Header>{data.trail_name}</Card.Header>
  //         <Card.Meta>Joined in 2016</Card.Meta>
  //         <Card.Description>
  //           Daniel is a comedian living in Nashville.
  //         </Card.Description>
  //       </Card.Content>
  //     </Card>
  //   )}
  // }


  render() {
    console.log(this.props.currentUser)
    console.log(this.state.myTrails)
   const currentUser = this.props.currentUser;

    let userImage;
    if (!!currentUser.image) {
      userImage = currentUser.image;
    } else {
      userImage = process.env.PUBLIC_URL + '/images/no_image.png';
    }
    return (
      <div>
        <div style={{textAlign: "center"}}>
          <div className='profile-container'>
            <img className="profile-pic" src={ userImage } alt="Add-a-profile-pic" />
            <div className='user-data'>
              <div className="name">{currentUser.name}</div><br></br>
              <div className="user-location" > 🌎 { currentUser.location } </div><br></br>
              <div className="user-registration-date">Member since: { this.createdAt(currentUser.created_at) }</div>
              <br></br>
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button basic color='green'>
                    Update Account
                  </Button>
                  <Button basic color='red' onClick={(e) => this.deleteAccount(e)}>
                   Delete Account
                  </Button>
                </div>
              </Card.Content>
              <h3>My favorite Trails</h3>
            </div>
          </div>
        </div>
        {this.state.myTrails.map(data =>
          <div class="ui centered card">
              <Card
                image={data.trail_image}
                header={data.trail_name}
                meta={this.difficulty()}
              />
            <Button inverted> Delete </Button>
        </div>)}
      </div>
    )
  }
}

export default Profile;
