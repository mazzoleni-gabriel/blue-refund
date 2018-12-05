import React, { Component } from "react";
import { Redirect } from 'react-router-dom'



export default class RedirectLogin extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit();
        this.state = {
          role: ""
        };
      }

    handleSubmit = event => {
        console.log("asdasdasd")    
        fetch("https://reembolsoazul.herokuapp.com/usuario/role",
        {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('Authorization'),
            }   
            })
        .then(res => res.json())
        .then(res =>  {
            if(res.role !== null && res.role !== undefined) {
                sessionStorage.setItem('role', res.role);
                window.location.reload();
            } else {
                alert("Algo deu errado");
            }
        })
    }

  render() {
    if (sessionStorage.getItem('Authorization') !== null ){
        if (sessionStorage.getItem('role') === 'ROLE_ADMIN') {
            return <Redirect to='/admin' />
        }
        if (sessionStorage.getItem('role') === 'ROLE_USER') {
            return <Redirect to='/usuario' />
        }
    }else{
        return <Redirect to='/' />
    }
    return (
        
        <div onLoad={this.handleSubmit}>
        Redirecionando 
        </div>
    );
    }
}