
import React, { Component } from "react"
import TrailCard from "../components/TrailCard"
import {Card, Icon, Search, Segment} from "semantic-ui-react"
import {NavLink} from 'react-router-dom';


class TrailsList extends Component {


 render(){
    return(
      <div >
       <Segment>
          <Card.Group itemsPerRow={3}>
            {
              this.props.trails.map(trail =>
              <NavLink to={`/trail/${trail.id}`} key={trail.id}>
                < TrailCard
                    trail= {trail} />
              </NavLink>)
            }
          </Card.Group>
        </Segment>
      </div>
    )
  }
}

export default TrailsList;
