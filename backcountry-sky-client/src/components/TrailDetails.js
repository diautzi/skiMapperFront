
import React, {Component} from "react";
import Profile from "../components/Profile";
import { NavLink } from 'react-router-dom';
import {Card, Icon, Rating, Grid, Form, Button, Image, Input} from "semantic-ui-react"


class TrailDetails extends Component {
  constructor(props) {
    super();
    this.state= {
      trail:[],
      comments:[],
      content: "",
      myTrails: [],
      buttonColor: '#979797'
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
    console.log(this.state.content)
    return(
       <div>
         <div style={{textAlign: "center"}}>

           <div>
              <h2>{this.state.trail.name}</h2>
              <strong>  Difficulty: {this.difficulty()} <br></br> </strong>
           </div>
           <div>
              <img style={{ borderRadius : "8px", height: "40%", width: "60%", marginLeft: "25px"}} alt="oh no!" src= {this.state.trail.imgMedium} />
              <div>
              { this.props.currentUser ?
                <>
                <Button
                  onClick={this.addToFavoritesClick}
                  color={this.state.buttonColor}
                  content='Add it to your bucket list ..'
                  icon='heart'
                  label={{ basic: true, color: 'red'}}
                />
                <NavLink to="/home">
                 <Button color="red" >Explore some more trails</Button>
                </NavLink>
                </>
                :
                <NavLink to="/home">
                 <Button color="red" >Explore some more</Button>
                </NavLink>
              }

              </div>
              <h2><blockquote>"{this.state.trail.summary}"</blockquote></h2>
              <h3>Location: {this.state.trail.location}  </h3>
              <div>
                <h3>
                  Length: {this.state.trail.length} miles <br></br>
                  ⛰️ Ascent: {this.state.trail.ascent} |  Descent: {this.state.trail.descent} <br></br>
                </h3>
              </div>
              <div>
                 <h4>Rating:
                    {this.state.trail.stars} <Rating icon='star' defaultRating={5}/>
                 </h4>
              </div>
            </div>
            <div class="conditions">
              <h4>Conditions:</h4>
                  <p> {this.state.trail.conditionStatus} </p>
                  <p> {this.state.trail.conditionDetails} </p>
            </div>
            <div class="comments">
            <Form onSubmit={this.handleSubmit} >
                <Form.Input onChange={this.handleChange} type="text" placeholder='Leave a thought...' name='content' value={this.state.content}/>
                <Form.Button>Submit</Form.Button>
            </Form>
            </div>
            <h2>Comments</h2>
            <div key={this.state.comments.id}>
            {this.state.comments.map(comment =>
              <Card style={{marginLeft: "40px"}}>
                {!!this.props.currentUser}
                <Card.Content >
                  <Image floated='left' size='mini' src={this.props.currentUser.image} />
                  <Card.Header>{this.props.currentUser.name}</Card.Header>
                  <Card.Meta>Posted at: {comment.created_at.slice(11, 19)} on  {comment.created_at.slice(0, 10)}</Card.Meta>
                  <Card.Description>
                    {comment.content}
                  </Card.Description>
                </Card.Content>
              </Card>
            )}
            </div>
         </div>
        </div>
     )
  }

}


export default TrailDetails;
