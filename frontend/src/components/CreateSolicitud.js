import React, { Component } from 'react';
import axios from 'axios';

class CreateSolicitud extends Component {
  async componentDidMount() {
    const res = await axios.get('http://localhost:4000/api/solicitudes');
    console.log(res);
  }

  render() {
    return (
      <div>
        CREATE SOLICITUD
      </div>
    );
  }
}

export default CreateSolicitud;
