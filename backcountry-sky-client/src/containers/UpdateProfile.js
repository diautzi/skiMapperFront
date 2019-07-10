import React, { Component } from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import {Router, Route, NavLink, Switch } from 'react-router-dom';


class UpdateProfile extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: this.props.currentUser.name,
      image: this.props.currentUser.image,
      location: this.props.currentUser.location,
      email: this.props.currentUser.email
    }
}
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitForm = (e, id) => {
    this.props.updateProfile(e)
    e.preventDefault();
    id = `${this.props.currentUser.id}`
    // console.log(id)
    fetch(`http://localhost:3000/api/v1/users/${id}`, {
      method: "PATCH", mode: "cors",
      headers: {
         "Content-Type": "application/json",
         "Accept": "application/json",
         // "Access-Control-Allow-Origin" :"http://localhost:3000"
       },
       body: JSON.stringify({
         name: this.state.name,
         image: this.state.image,
         location: this.state.location,
         email: this.state.email
       })
     })
     .then(resp => resp.json())
     .then(resp => this.setState({
       currentUser: resp }))

  }


  render() {
    return(
     <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
       <Grid.Column style={{ maxWidth: 450 }}>
         <Header as='h2' color='red' textAlign='center'>
           <Image src={this.props.currentUser.image} /> Update Your Account
         </Header>
         <Form size='large' onSubmit={this.submitForm}>
           <Segment stacked>
             <Form.Input
              className="form-control"
               onChange={(e) => this.handleChange(e)}
               type="text"
               name="name"
               value={this.state.name}
               placeholder='Name '/>
             <Form.Input
                onChange={(e) => this.handleChange(e)}               name="image"
                 value={this.state.image}
                 placeholder='Image URL' />
             <Form.Input
              onChange={(e) => this.handleChange(e)}               name="location"
               value={this.state.location}
               placeholder='Location' />
             <Form.Input
              onChange={(e) => this.handleChange(e)}               name="email"
               value={this.state.email}
               placeholder='E-mail address' />
               <Button color='red' fluid size='large'>
                 Update Info
               </Button>
             <NavLink to="/profile" exact>
             </NavLink>
           </Segment>
         </Form>
       </Grid.Column>
     </Grid>
    )
  }
}

export default UpdateProfile;
