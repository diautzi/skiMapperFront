
import React, { Component } from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import {Router, Route, NavLink, Switch } from 'react-router-dom';


class Login extends Component {

  state = {
    email: "",
    password: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitForm = () => {
    this.props.login(this.state.email, this.state.password)
  }


  render() {
    return(
     <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
       <Grid.Column style={{ maxWidth: 450 }}>
         <Header as='h2' color='teal' textAlign='center'>
           <Image src='/logo.png' /> Log-in to your account
         </Header>
         <Form size='large' onSubmit={this.submitForm}>
           <Segment stacked>
             <Form.Input
              onChange={this.handleChange}
              fluid icon='user' iconPosition='left'
              placeholder='E-mail address'
              name="email"
             />
             <Form.Input
               onChange={this.handleChange}
               fluid
               icon='lock'
               iconPosition='left'
               placeholder='Password'
               type='password'
               name="password"
             />

             <Button color='teal' fluid size='large'>
               Login
             </Button>
           </Segment>
         </Form>
         <Message>
           New to us? <NavLink
             to="/signup"
             exact>Signup</NavLink>
         </Message>
       </Grid.Column>
     </Grid>
    )
  }
}

export default Login;
