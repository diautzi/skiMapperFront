import React, { Component } from "react";
import TrailsList from "../containers/TrailsList";
import { Search, Segment } from "semantic-ui-react";

class MainContainer extends Component {
  constructor() {
    super()
    this.state = {
      trails: [],
      search: ""
    }
     this.server = "http://localhost:3000//api/v1/trails"
  };

  getSearchInput = (e, {value} ) => {
    this.setState({
      search: value
    })
  };

   componentDidMount() {
     fetch(this.server)
     .then(resp => resp.json())
     .then(data => this.setState({
       trails: data.trails
     })
    )
   };

  desiredTrails = () => {
     let tempTrails = [...this.state.trails]
     let filteredTrails = tempTrails.filter(trail => {
       if (trail.name.toLowerCase().includes(this.state.search)) {
         return trail
       }
       else if (trail.location.toLowerCase().includes(this.state.search)){
         return trail
       }
       else if (trail.difficulty.includes(this.state.search)){
         return trail
       }
     })
     return filteredTrails
   };

  render() {
    return(
      <div >
        <Segment inverted color="black" >
          <Search size="large" onSearchChange={this.getSearchInput} placeholder="Search By City Or Trail"/>
        </Segment>
        <div>
          <TrailsList trails={this.desiredTrails()}/>
        </div>
      </div>
    )
  }
}
export default MainContainer;
