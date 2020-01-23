
import React, {Component} from "react";
import Profile from "../components/Profile";
import { NavLink } from 'react-router-dom';
import {Card, Icon, Rating, Grid, Form, Button, Segment, Input, Image} from "semantic-ui-react"
import MapContainer from "../components/MapContainer"
import { style } from "../App.css"

class TrailDetails extends Component {
  constructor(props) {
    super();
    this.state= {
      trail:[],
      comments:[],
      content: "",
      myTrails: [],
      buttonColor: ""
    }
  }

  difficulty = () => {
    let level;
    if (this.state.trail.difficulty === "blue") {
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


  componentDidMount() {
     fetch('http://localhost:3000/api/v1/trails/')
       .then(response => response.json())
       .then(trailsData => this.setState({
         trail: trailsData.trails.find(trail => trail.id == this.props.location.pathname.split('/')[2])
       }));

       fetch("http://localhost:3000/api/v1/comments")
       .then(resp => resp.json())
       .then(comments => this.setState({
         comments: comments.filter(comment => comment.trail_id == this.state.trail.id)
       }));
   }


  handleChange = (e) => {
     this.setState({
       content: e.target.value
     })
  }

  addComment = (comment) => {
     this.setState({
       comments: [...this.state.comments, comment]
     })
  }

  handleSubmit = (e) => {
     e.preventDefault();
     if ( !!this.props.currentUser ) {
       fetch("http://localhost:3000/api/v1/comments", {
         method: "POST", mode: "cors",
         headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin" :"http://localhost:3000"
          },
          body: JSON.stringify({
            content: this.state.content,
            trail_id: this.state.trail.id,
            user_id: this.props.currentUser.id
            })
          })
          .then(resp => resp.json())
          .then(comment => this.addComment(comment))
          .then(this.setState({
            content: ""
        })
       )
     }
     else {
      alert('Please "Log In" to leave a comment!')
      this.setState({
        content: ""
      })
     }
  }

  addToFavorites = (trail) => {
    this.setState({
      myTrails: [...this.state.myTrails, trail]
    })
  }

  addToFavoritesClick = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/v1/completed_trails", {
      method: "POST", mode: "cors",
      headers: {
         "Content-Type": "application/json",
         "Accept": "application/json",
         // "Access-Control-Allow-Origin" :"http://localhost:3000"
       },
       body: JSON.stringify({
         user_id: this.props.currentUser.id,
         trail_id: this.state.trail.id,
         trail_name: this.state.trail.name,
         trail_length: this.state.trail.length,
         trail_image: this.state.trail.imgMedium,
         trail_difficulty: this.state.trail.difficulty
       })
    })
     .then(resp => resp.json())
     .then(json => this.addToFavorites(json))
      this.setState({
       buttonColor: "#000000"
     })
  }


  render(){
    const trail = this.state.trail
    const showImage = !!trail.imgMedium ? trail.imgMedium : process.env.PUBLIC_URL + 'https://cdn.shopify.com/s/files/1/0231/7685/t/3/assets/no-image-available.png?2214404492633272863';

    return(
       <div>
          <div class= "map"><MapContainer trail={trail}/></div>
          <div style={{textAlign: "center"}}>
            <h1>{trail.name}</h1>
            <strong> Difficulty: { this.difficulty() } </strong>
          </div>
          <div>
            <img className="trail-details-image" alt="oh no!" src= { showImage } />
            <div style={{textAlign: "center"}}>
            <Segment>
              { this.props.currentUser ?
                <>
                <Button
                  onClick={this.addToFavoritesClick}
                  color="red"
                  inverted
                  icon="heart"
                  content='Add to Your Completed Trails ..'
                />
                <NavLink to="/home">
                 <Button
                   color="red"
                   inverted
                   content='Explore some more trails'
                    />
                </NavLink>
                </>
                :
                <NavLink to="/home">
                 <Button
                    color="black"
                    size='huge'>
                      Explore some more
                  </Button>
                </NavLink>
              }
            </Segment>
          </div>
          <div style={{textAlign: "center"}}>
            <h2><blockquote>"{trail.summary}"</blockquote></h2>
            <h2>🌎 Location: {trail.location}  </h2>
            <h3>Length: {trail.length} Miles </h3><br></br>
            <h3>Descent ⛰️: {trail.descent}' </h3><br></br>
            <h4>Rating: {trail.stars} <Rating icon='star' defaultRating={5}/></h4>
          </div>
          <div class="conditions">
            <h3 >Conditions:</h3>
              <p> {trail.conditionStatus} </p>
              <p> {trail.conditionDetails} </p>
          </div>
          <br></br>
          <div class="comments">
            <Form onSubmit={this.handleSubmit} >
              <input onChange={this.handleChange} type="text" placeholder='Leave a thought...' name='content' value={this.state.content}/>
              <Button className="submit-btn"
                color="red">
                Submit
              </Button>
            </Form>
          </div>
          <br></br>
          <br></br>

          {this.state.comments.length >0 ? <h2 style={{marginLeft: "20px", fontColor: "red"}}>Comments</h2> : ""}
          <div key={this.state.comments.id}>
            {this.state.comments.map(comment =>
              <Card style={{marginLeft: "40px"}}>
                {!!this.props.currentUser ? <Card.Content >
                  <Image floated='left' size='mini' src={this.props.currentUser.image} />
                  <Card.Header>{this.props.currentUser.name}</Card.Header>
                  <Card.Meta>Posted at: {comment.created_at.slice(11, 19)} on  {comment.created_at.slice(0, 10)}</Card.Meta>
                  <Card.Description>
                    {comment.content}
                  </Card.Description>
                </Card.Content>
                :
                <Card.Content >
                  <Image floated='left' size='mini' src={comment.user.image} />
                  <Card.Header>{comment.user.name}</Card.Header>
                  <Card.Meta>Posted at: {comment.created_at.slice(11, 19)} on  {comment.created_at.slice(0, 10)}</Card.Meta>
                  <Card.Description>
                    {comment.content}
                  </Card.Description>
                </Card.Content>
              }

              </Card>
            )}
            </div>
          </div>
        </div>
     )
  }

}


export default TrailDetails;
