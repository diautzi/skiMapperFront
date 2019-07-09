
import React from "react"
import {Card, Icon, Rating, Button } from "semantic-ui-react"
import { NavLink } from 'react-router-dom';
import { style } from "../App.css"

const TrailCard = (props) => {
  const difficulty = () => {
    let level;
    if (props.trail.difficulty === "blue") {
      level = "Blue";
    } else if (props.trail.difficulty === "greenBlue") {
      level = "Intermediate Green";
    } else if (props.trail.difficulty === "blueBlack") {
      level = "Intermediate Blue";
    } else if (props.trail.difficulty === "black") {
      level = "Black 🔷";
    } else if (props.trail.difficulty === "dblack") {
      level = "Double Black 🔷";
    } else if (props.trail.difficulty === "green") {
      level = "Easy"
    } else {
      level = "N/A"
    }
    return level;
  }


  return (
    <Card style= {{margin: "10px"}}>
      <div style={{textAlign: "center"}}>
        <div className= "image" >
          <img style={{ borderRadius : "8px", height: "140px", width: "100%", padding: "1%"}} alt="oh no!" src= {props.trail.imgSmall}/>
        </div>
        <div className="content">
          <div className="header">
            <h4>{props.trail.name}</h4>
            <div className="extra content">
              <span>
                <strong> Difficulty: {this.difficulty()} </strong>
              </span>
          </div>
        </div>
        <div className="content" >
          <div className="header"><strong>Location: </strong> {props.trail.location}</div>
        </div>
        <div>
          <span>
            <strong>Rating: </strong>
              {props.trail.stars} <Rating icon='star' defaultRating={5} />
          </span>
        </div>
        </div>
      </div>
      <Button color="red" center >More details</Button>
    </Card>
  );
};

export default TrailCard;
