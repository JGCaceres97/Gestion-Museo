import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import AddLibro from './components/AddLibro';
import CrearSolicitud from './components/CreateSolicitud';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Route path='/registro' component={Register} />
      <Route path='/login' component={Login} />
      <Route path='/crearSolicitud' component={CrearSolicitud} />
      <Route path='/addBook' component={AddLibro} />
      <Route path='/editBook/:id' component={AddLibro} />
    </Router>
  );
}

export default App;
