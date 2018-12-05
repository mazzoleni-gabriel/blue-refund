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
        sessionStorage.clear();
        window.location.reload();
    }

  render() {
    if (sessionStorage.getItem('role') === null) {
        return <Redirect to='/login' />
    }
    return (
        
        <div onLoad={this.handleSubmit}>
        Redirecionando 
        </div>
    );
    }
}