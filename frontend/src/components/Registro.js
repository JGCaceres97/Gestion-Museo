import React, { Component } from 'react';

class Registro extends Component {
  state = {
    Nombre: '',
    Apellido: '',
    Correo: '',
    Password: ''
  }

  handleChange = input => e => {
    this.setState({
      [input]: e.target.value
    });
  }

  render() {
    return (
      <React.Fragment>
        REGISTRO
      </React.Fragment>
    );
  }
}

export default Registro;
