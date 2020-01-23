
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
    return (
      <Card style= {{margin: "13px"}}>
        <div  >
          <div className= "image" >
            <img className="trail-card-image" alt="oh no!" src= {this.props.trail.imgSmall}/>
          </div>
          <div className="content">
            <div className="header">
              <h4>{this.props.trail.name}</h4>
              <div className="extra content">
                <span>
                  <strong> Difficulty: {this.difficulty()} </strong>
                </span>
            </div>
          </div>
          <div className="content" >
            <div className="header"><strong>Location: </strong> {this.props.trail.location}</div>
          </div>
          <div>
            <span>
              <strong>Rating: </strong>
                {this.props.trail.stars} <Rating icon='star' defaultRating={5} />
            </span>
          </div>
          </div>
        </div>
        <Button color="red" center >More details</Button>
      </Card>
    );
  }

};

export default TrailCard;
