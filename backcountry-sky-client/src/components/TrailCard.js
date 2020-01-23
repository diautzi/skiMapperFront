
import React from "react"
import {Card, Icon, Rating, Button } from "semantic-ui-react"
import { NavLink } from 'react-router-dom';
import { style } from "../App.css"


class TrailCard extends React.Component {

  difficulty = () => {
    let level;
    if (this.props.trail.difficulty === "blue") {
      level = "Blue";
    } else if (this.props.trail.difficulty === "greenBlue") {
      level = "Intermediate Green";
    } else if (this.props.trail.difficulty === "blueBlack") {
      level = "Intermediate Blue";
    } else if (this.props.trail.difficulty === "black") {
      level = "Black 🔷";
    } else if (this.props.trail.difficulty === "dblack") {
      level = "Double Black 🔷";
    } else if (this.props.trail.difficulty === "green") {
      level = "Easy"
    } else {
      level = "N/A"
    }
    return level;
  }


  render() {
    const trail = this.props.trail
    const showImage = !!trail.imgMedium ? trail.imgMedium : process.env.PUBLIC_URL + 'https://cdn.shopify.com/s/files/1/0231/7685/t/3/assets/no-image-available.png?2214404492633272863';

    return (
    <Card style= {{margin: "13px"}}>
      <div className="trail-card">
        <img className="trail-card-image" src= { showImage }/>
        <h4>{trail.name}</h4>
        <strong> Difficulty: {this.difficulty()} </strong><br></br>
        <strong>Location: </strong> {trail.location}
        <div>
          <strong>Rating: </strong> {trail.stars} <Rating icon='star' defaultRating={5} />
        </div>
      </div>
      <Button
         color="black"
         centered >
          More details
      </Button>
    </Card>
    );
    }

};

export default TrailCard;
