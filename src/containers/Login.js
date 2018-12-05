import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import { Redirect } from 'react-router-dom'


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      senha: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.senha.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    fetch("https://reembolsoazul.herokuapp.com/auth/login",
    {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.state.email,
            senha: this.state.senha,
          })    
        })
        .then(console.log("asdasdasd"))
    .then(res => res.json())
    .then(res =>  {
        if(res.access_token !== null) {
            sessionStorage.setItem('Authorization', 'Bearer ' + res.access_token);  
            window.location.reload();
        } else {
            alert("Algo deu errado");
        }
    })
    event.preventDefault();
  }


  render() {
    if (sessionStorage.getItem('Authorization') !== null && sessionStorage.getItem('Authorization') !== undefined) {
        return <Redirect to='/redirect-login' />
    }
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit} >
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="senha" bsSize="large">
            <ControlLabel>Senha</ControlLabel>
            <FormControl
              value={this.state.senha}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}