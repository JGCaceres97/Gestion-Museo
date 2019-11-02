import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import AddLibro from './components/AddLibro';
import CrearSolicitud from './components/CreateSolicitud';
import FormRegister from './components/FormRegister';
import FormLogin from './components/FormLogin';

function App() {
  return (
    <Router>
      <Route path='/registro' component={FormRegister} />
      <Route path='/login' component={FormLogin} />
      <Route path='/crearSolicitud' component={CrearSolicitud} />
      <Route path='/addBook' component={AddLibro} />
      <Route path='/editBook/:id' component={AddLibro} />
    </Router>
  );
}

export default App;
