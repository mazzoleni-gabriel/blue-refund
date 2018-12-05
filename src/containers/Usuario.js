import React, { Component } from "react";
import "./Usuario.css";
import { Button, Table, FormGroup, FormControl, ControlLabel  } from "react-bootstrap";





export default class Usuario extends Component {
  constructor(props) {
    super(props);

    this.state = {
        revenues: {
            revenues: [],
            flag: false
        },
        categories: {        
            categories: [],
            flag: false
        },
        categoria: 'Transporte',
        data: '2018-12-07',
        nome: 'descrição',
        uploadUrl: 'server\\imagem.jpg',
        valorSolicitado: 5
    };
  }


  
handleChange = event => {
    this.setState({
        [event.target.id]: event.target.value
    });
}

newRevenue = event => {
    event.preventDefault();
    fetch("https://reembolsoazul.herokuapp.com/reembolso/adiciona",
    {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('Authorization'),
          },
          body: JSON.stringify({
            categoria: this.state.categoria,
            data: this.state.data,
            nome: this.state.nome,
            uploadUrl: "server\\imagem.jpg",
            valorSolicitado: this.state.valorSolicitado
          })    
        }).then((response) => {
            if(response.ok) {
                window.location.reload();
            } else {
                alert("Algo deu errado");
            }
        }).then(response => console.log(response))
  
}   

loadCategories = event => {
    if(this.state.categories.flag === false){
        fetch("https://reembolsoazul.herokuapp.com/categoria/buscatodas",
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
                categories:{
                    categories: res,
                    flag: true
                }
                
            })
        })
    }
}   

loadRevenues = event => {
    if(this.state.revenues.flag === false){
        fetch("https://reembolsoazul.herokuapp.com/reembolso/buscaPorEmpregado",
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
                revenues:{
                    ...this.state.revenues,
                    revenues: res,
                    flag: true
                }
                
            })
        })
    }
}   


createHeader = () => {
    let table = []

    let children = []

    children.push(<th>{"categoria"}</th>)
    children.push(<th>{"nome"}</th>)
    children.push(<th>{"valorSolicitado"}</th>)
    children.push(<th>{"data"}</th>)
    children.push(<th>{"status"}</th>)
    table.push(<thead><tr>{children}</tr></thead>)
    
    return table
}

createTable = () => {
    let table = []

    for (let i = 0; i < this.state.revenues.revenues.length; i++) {
        let children = []

        children.push(<td>{this.state.revenues.revenues[i].categoria}</td>)
        children.push(<td>{this.state.revenues.revenues[i].nome}</td>)
        children.push(<td>{this.state.revenues.revenues[i].valorSolicitado}</td>)
        children.push(<td>{this.state.revenues.revenues[i].data}</td>)
        children.push(<td>{this.state.revenues.revenues[i].status}</td>)
        table.push(<tr>{children}</tr>)
    }

    return table
  }

  createOptions = () => {
    
    let options = []
    for (let i = 0; i < this.state.categories.categories.length; i++) {
        if(i === 0){
            options.push(<option selected value={this.state.categories.categories[i].nome}>{this.state.categories.categories[i].nome}</option>)
        }else{
            options.push(<option value={this.state.categories.categories[i].nome}>{this.state.categories.categories[i].nome}</option>)
        }
    }
    
    return options
}


  render() {
    return (
        <div className="Usuario">
            <div  onLoad={this.loadCategories()}></div>
            <div  onLoad={this.loadRevenues()}></div>

            <Table striped bordered condensed hover>
                {this.createHeader()}
                <tbody>
                    {this.createTable()}
                </tbody>

            </Table>

            <div className="NewRevenue">
                <form onSubmit={this.newRevenue} >
                    <FormGroup controlId="nome" bsSize="small">
                        <ControlLabel>Descrição</ControlLabel>
                        <FormControl
                            autoFocus
                            value={this.state.nome}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="valorSolicitado" bsSize="small">
                        <ControlLabel>Valor</ControlLabel>
                        <FormControl
                            value={this.state.valorSolicitado}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="data" bsSize="small">
                        <ControlLabel>Data</ControlLabel>

                        <FormControl
                          value={this.state.data}
                          onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="categoria">
                        <ControlLabel>Categorias</ControlLabel>
                        <FormControl 
                            componentClass="select" 
                            placeholder="select"
                            value={this.state.categoria}
                            onChange={this.handleChange}>
                            {this.createOptions()}
                        </FormControl>
                    </FormGroup>
                    <Button
                        bsSize="large"
                        type="submit"
                    >
                        Novo Reembolso
                    </Button>
                </form>
            </div>
    
        </div>
    );
  }
}