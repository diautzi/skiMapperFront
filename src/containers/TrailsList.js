import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import {NavLink} from 'react-router-dom';

// import components
import TrailCard from "../components/TrailCard";

class TrailsList extends Component {
 render() {
   return (
    <div>
      <Card.Group className='centered'>
        {
          this.props.trails.map(trail =>
            <NavLink to={`/trail/${trail.id}`} key={trail.id}>
              < TrailCard
                trail={trail} />
            </NavLink>)
        }
      </Card.Group>
    </div>
   );
  };
};

export default TrailsList;