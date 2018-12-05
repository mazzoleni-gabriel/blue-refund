import React, { Component } from "react";
import "./Admin.css";
import { Label, Table, DropdownButton, MenuItem  } from "react-bootstrap";





export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
        info: {
            id: null,
            nome: null,
            codEmpregado: null,
            codAdmin: null
        },
        data: {
            revenues: [],
            flag: false
        }
    };
  }

approve = (id) =>{
    fetch("https://reembolsoazul.herokuapp.com/reembolso/aprova",
    {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('Authorization'),
          },
          body: JSON.stringify({
            id: id,
            valorReembolsado: 0
          })    
        }).then( () => {
            window.location.reload();
        })
  }

repprove = (id) =>{
    fetch("https://reembolsoazul.herokuapp.com/reembolso/reprova",
    {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('Authorization'),
          },
          body: id= id    
        }).then( () => {
            window.location.reload();
        })
}


  loadInfo = event => {
    if(this.state.info.id === null){
        fetch("https://reembolsoazul.herokuapp.com/usuario/dadosEmpresaAdmin",
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
            this.setState({
                info: {
                    ...this.state.codAdmin,
                    id: res.id,
                    nome: res.nome,
                    codEmpregado: res.codEmpregado,
                    codAdmin: res.codAdmin
                }
            })
        })
    }
}

loadRevenues = event => {
    if(this.state.data.flag === false){
        fetch("https://reembolsoazul.herokuapp.com/reembolso/buscaPorEmpresa",
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
            this.setState({
                data:{
                    ...this.state.data,
                    revenues: res,
                    flag: true
                }
                
            })
        })
        .then(console.log(this.state.data.revenues))
    }
}   


createHeader = () => {
    let table = []

    // Outer loop to create parent
    let children = []


    children.push(<th>{"Opções"}</th>)
    children.push(<th>{"categoria"}</th>)
    children.push(<th>{"nome"}</th>)
    children.push(<th>{"valorSolicitado"}</th>)
    children.push(<th>{"emailEmpregado"}</th>)
    children.push(<th>{"data"}</th>)
    children.push(<th>{"status"}</th>)
    table.push(<thead><tr>{children}</tr></thead>)
    
    return table
}

createTable = () => {
    let table = []

    for (let i = 0; i < this.state.data.revenues.length; i++) {
        let children = []
        children.push(
            <DropdownButton
            bsSize="small"
            title={'Opções'}
            key={i}
            id={`dropdown-basic-${i}`}
            >
            <MenuItem eventKey={this.state.data.revenues[i].id} onSelect={this.approve}>Aprovar</MenuItem>
            <MenuItem eventKey={this.state.data.revenues[i].id} onSelect={this.repprove}>Reprovar</MenuItem>
            </DropdownButton>       
        )
        children.push(<td>{this.state.data.revenues[i].categoria}</td>)
        children.push(<td>{this.state.data.revenues[i].nome}</td>)
        children.push(<td>{this.state.data.revenues[i].valorSolicitado}</td>)
        children.push(<td>{this.state.data.revenues[i].emailEmpregado}</td>)
        children.push(<td>{this.state.data.revenues[i].data}</td>)
        children.push(<td>{this.state.data.revenues[i].status}</td>)
        table.push(<tr>{children}</tr>)
    }

    return table
  }


  render() {
    return (
        <div className="Admin">
            <div  onLoad={this.loadInfo()}></div>
            <div  onLoad={this.loadRevenues()}></div>

            <div className="Labels">
            <Label bsStyle="default">{'Cod Admin: ' + this.state.info.codAdmin}</Label>{'    '}
            <Label bsStyle="default">{'Cod Empregado: ' + this.state.info.codEmpregado}</Label>
            </div>

            <Table striped bordered condensed hover>
                {this.createHeader()}
                <tbody>
                    {this.createTable()}
                </tbody>

            </Table>

        </div>
    );
  }
}