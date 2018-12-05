import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel, ButtonGroup, Radio, Alert } from "react-bootstrap";
import "./Register.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
        nome: "",
        email: "",
        empresa: "",
        senha: "", 
        type: "new"
    };
  }

  Example = (props) => {
    return(
        <div>
            <Alert color="primary">
              This is a primary alert — check it out!
            </Alert>
        </div> 
        )   
  }


  validateForm() {
    return this.state.email.length > 0 && this.state.senha.length > 0;
  }

  handleOptionChange(option) {
      this.state.type = option;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    if (this.state.type === "new"){
        fetch("https://reembolsoazul.herokuapp.com/usuario/cadastro/admineempresa",
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
                body: JSON.stringify({
                    email: this.state.email,
                    senha: this.state.senha,
                    empresa: this.state.empresa,
                    nome: this.state.nome
                })
            })
            .then((response) => {
                if(response.ok) {
                    alert("Registrado com sucesso");
                } else {
                    alert("Algo deu errado");
                }
            })
        .then( console.log(this.state));
        event.preventDefault();
    }else{
        fetch("https://reembolsoazul.herokuapp.com/usuario/cadastro/porcodigo",
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                senha: this.state.senha,
                empresa: this.state.empresa,
                nome: this.state.nome
            })    
            })
            .then((response) => {
                if(response.ok) {
                    alert("Registrado com sucesso");
                } else {
                    alert("Algo deu errado");
                }
            })
        .then( console.log(this.state));
        event.preventDefault();
    }
  }

  register = async event => {
    try {
        await this.handleSubmit;
        alert("Registrado com sucesso");
      } catch (e) {
        alert("Algo deu errado");
      }
  }

  render() {
    return (
      <div className="Register">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="nome" bsSize="large">
            <ControlLabel>Nome</ControlLabel>
            <FormControl
              autoFocus
              value={this.state.nome}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="empresa" bsSize="large">
            <ControlLabel>Empresa</ControlLabel>
            <FormControl
              autoFocus
              value={this.state.empresa}
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
          <ButtonGroup>
            <Radio name="groupOptions"
                checked={true}
                onChange={() => this.handleOptionChange("new")}>
                Nova empresa
             </Radio>
            <Radio 
                name="groupOptions" 
                onChange={() => this.handleOptionChange("old")}>
                Empresa existente
            </Radio>
          </ButtonGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Registrar
          </Button>
        </form>
      </div>
    );
  }
}