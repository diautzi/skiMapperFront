
import React, {Component} from "react";
import Profile from "../components/Profile";
import { NavLink } from 'react-router-dom';
import {Card, Icon, Rating, Grid, Form, Button, Segment, Input, Image} from "semantic-ui-react"
import MapContainer from "../components/MapContainer"
import { style } from "../App.css"

class TrailDetails extends Component {
  constructor(props) {
    super();
    this.state = {
      trail: [],
      comments: [],
      content: "",
      myTrails: [],
      buttonColor: ""
    };
  };

////////////// for intorductory description ////////////////
  difficulty = () => {
    let level;
    if (this.state.trail.difficulty === "blue") {
      level = <Button  secondary>INTERMIDIATE</Button>;
    } else if (this.state.trail.difficulty === "greenBlue") {
      level = <Button  secondary>INTERMEDIATE EASY</Button>;;
    } else if (this.state.trail.difficulty === "blueBlack") {
      level = <Button  secondary>MORE DIFFICLUT</Button>;;
    } else if (this.state.trail.difficulty === "black") {
      level = <Button  secondary>DIFFICULT</Button>;;
    } else if (this.state.trail.difficulty === "dblack") {
      level = <Button  secondary>MOST DIFFICULT</Button>;;
    } else if (this.state.trail.difficulty === "green") {
      level = <Button  secondary>EASIEAST</Button>;
    } else {
      level = "N/A"
    }
    return level;
  }

/////////// for trail description details ////////////
  difficultyLevel = () => {
    let level;
    if (this.state.trail.difficulty === "blue") {
        level = "BLUE"
    } else if (this.state.trail.difficulty === "greenBlue") {
        level = "INTERMIDIATE BLUE"
    } else if (this.state.trail.difficulty === "blueBlack") {
        level = "INTERMEDIATE BLACK"
    } else if (this.state.trail.difficulty === "black") {
        level = "BLACK"
    } else if (this.state.trail.difficulty === "dblack") {
        level = "DOUBLE BLACK"
    } else if (this.state.trail.difficulty === "green") {
        level = "GREEN"
    } else {
        level = "N/A"
    }
    return level;
  }

//////////// display rating function //////////////
  displayStars = () => {
     let stars = ''
     if (this.state.trail.stars === 5) {
       stars = '★★★★★'
     } else if (this.state.trail.stars >= 4 && this.state.trail.stars < 5) {
       stars = '★★★★☆'
     } else if (this.state.trail.stars >= 3 && this.state.trail.stars < 4) {
       stars = '★★★☆☆'
     } else if (this.state.trail.stars >= 2 && this.state.trail.stars < 3) {
       stars = '★★☆☆☆'
     } else if (this.state.trail.stars >= 1 && this.state.trail.stars < 2) {
       stars = '★☆☆☆☆'
     } else {
       stars = "no rating yet"
     }
     return stars;
   }


///////// display date /////////////////
   date = (date) => {
    let newDate = new Date(date)
    let allMonths = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct","Nov", "Dec"]
    return newDate.getDate() + ' ' + allMonths[newDate.getMonth()] + ' ' + newDate.getFullYear()
  }



////////////// fetching trail info  and comments /////////////
  componentDidMount() {
     fetch('https://serene-lake-00689.herokuapp.com/api/v1/trails/')
       .then(response => response.json())
       .then(trailsData => this.setState({
         trail: trailsData.trails.find(trail => trail.id == this.props.location.pathname.split('/')[2])
       }));

       fetch("https://serene-lake-00689.herokuapp.com/api/v1/comments")
       .then(resp => resp.json())
       .then(comments => this.setState({
         comments: comments.filter(comment => comment.trail_id == this.props.location.pathname.split('/')[2])
       }));
   }



//////////// commmets posting/////////////////

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
       fetch("https://serene-lake-00689.herokuapp.com/api/v1/comments", {
         method: "POST", mode: "cors",
         headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin" :"https://serene-lake-00689.herokuapp.com"
          },
          body: JSON.stringify({
            content: this.state.content,
            trail_id: this.state.trail.id,
            user_id: this.props.currentUser.id,
            user_name: this.props.currentUser.name,
            pic_url: this.props.currentUser.image
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



  ///////// add trail to users completed/favorite trails//////////

  addToFavoritesClick = (e) => {
    e.preventDefault();
    fetch("https://serene-lake-00689.herokuapp.com/api/v1/completed_trails", {
      method: "POST", mode: "cors",
      headers: {
         "Content-Type": "application/json",
         "Accept": "application/json",
         "Access-Control-Allow-Origin" :"https://serene-lake-00689.herokuapp.com/"
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
    const comments = this.state.comments.map(user => user)
    console.log(comments[0])

    return(
       <div>
          <div class= "map">
            <MapContainer trail={trail}/>
          </div>
      
          <div className= "trail-title">
            <h1>{trail.name}</h1>
            <h2 style={{fontStyle: 'italic'}}><strong>"{ trail.summary }."</strong><br></br></h2>
          </div>
      
          <div>
            <div className="trail-details">
             <strong> { this.difficulty()} </strong>
             <strong>{this.displayStars()} </strong>
             <strong> {trail.location} </strong>
          </div>

          <img className="trail-details-image" src= { showImage } />
          <div className="explore-button">
             <Segment>
                { !!this.props.currentUser ?
                  <>
                  <Button
                    size="huge"
                    onClick={this.addToFavoritesClick}
                    color="red"
                    inverted
                    icon="heart"
                    content='Add to Your Completed Trails'
                  />
                  <NavLink to="/home">
                   <Button
                     size="huge"
                     color="red"
                     inverted
                     content='Explore more trails '/>
                  </NavLink>
                  </>
                  :
                  <NavLink to="/home">
                   <Button
                      color="black"
                      size='huge'>
                      Explore more trails
                    </Button>
                  </NavLink>
                }
            </Segment>
          </div>

          <div className= "trail-description">
            <Grid divided='vertically'>
              <Grid.Row columns={3}>
                <Grid.Column>
                  <h3><strong>⛷️Trail</strong></h3>
                  <strong>{trail.length}</strong> miles point to point
                  <div><strong> { trail.type}</strong></div>
                  <div>Type :<strong> Backcountry or Sidecountry </strong></div>
                  <div><strong>{ this.difficultyLevel(trail.difficulty)} ℹ️ </strong></div>
                </Grid.Column>
                <Grid.Column>
                  <h3> ⛰️Elevation </h3>
                  <div>Ascent: <strong>{trail.ascent}' </strong></div>
                  <div>Descent: <strong>{trail.descent}' </strong></div>
                  <div>High: <strong>{trail.high}' </strong></div>
                  <div>Low: <strong>{trail.low}' </strong></div>
                </Grid.Column>
                <Grid.Column>
                  <h3>⬆⬇ Grade </h3>
                  <div>Avg Slope: <strong> 30%(23') </strong></div>
                  <div>Max Slope: <strong> 78%(83')</strong></div>
                  <div>Conditions: <strong> {trail.conditionDetails ? trail.conditionDetails : "Ice ax and ski crampons are a good idea if the surface is hard."}</strong></div>
                  <div>Last Updated: <strong> {this.date(trail.conditionDate)} </strong></div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>

          
          {this.state.comments.length > 0 ? <h2 style={{marginLeft: "20px"}}> {this.state.comments.length} Comment(s) </h2> : <h2 style={{marginLeft: "20px"}}><strong>Be the first to leave a comment!</strong></h2>}
          <Segment style={{background: "#F8F8F8"}}>
            <Form onSubmit={this.handleSubmit} >
              <form class="comments">
               <Input size='huge' onChange={this.handleChange} type="text" placeholder='Write a comment...' name='content' value={this.state.content}/>
               <Button  size="huge" className="submit-btn comments"
                 color="red">
                 Submit
               </Button>
              </form>
            </Form>
          </Segment>
          <div key={this.state.comments.id}>
            {this.state.comments.map(comment =>
              <Card style={{marginLeft: "40px", marginBottom: "30px", width: "445px"}}>
                  <Card.Content >
                    <Image floated='left' size='mini' src={comment.user.image} />
                    <Card.Header>{comment.user.name}</Card.Header>
                    <Card.Meta>Posted at: {comment.created_at.slice(11, 19)} on  {this.date(comment.created_at.slice(0, 10))}</Card.Meta>
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
