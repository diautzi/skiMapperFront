import React, { Component } from "react";
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react';

class Signup extends Component {
  state={
    name: "",
    image: "",
    location: "",
    email: "",
    password: "",
     passwordConfirmation: ""
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
   };

  handleSubmit = (e) => {
    const data = this.state;
    this.props.signup(data, (e) => this.props.history.push("/home"));
  };

  render() {
    return (
      <Grid
        textAlign='center'
        className='container'
        verticalAlign='middle'>
        <Grid.Column className='column-width'>
          <Header as='h2' color='red' textAlign='center'>
            <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuz4ys13YZ-pwKXvCP-Hq_39sU9ZhHhM-JLPreXfAOHQKvzzcl' /> SignUp for a New Account
          </Header>
          <Form size='large' onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                onChange={this.handleChange}
                name="name"
                value={this.state.name}
                placeholder='Name' />
              <Form.Input
                onChange={this.handleChange}
                name="image"
                value={this.state.image}
                placeholder='Image URL' />
              <Form.Input
                onChange={this.handleChange}
                name="location"
                value={this.state.location}
                placeholder='Location' />
              <Form.Input
                onChange={this.handleChange}
                name="email"
                value={this.state.email}
                placeholder='E-mail address' />
              <Form.Input
                onChange={this.handleChange}
                name="password"
                value={this.state.password}
                placeholder='Password'
                type='password'
              />
              <Form.Input
                onChange={this.handleChange}
                name="passwordConfirmation"
                value={this.state.passwordConfirmation}
                placeholder='Password Confirmation'
                type='password'
              />
              <Button color='red' fluid size='large'>
                Create Account
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
     </Grid>
   );
 };
};

export default Signup;