import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import AddLibro from './components/AddLibro';
import CrearSolicitud from './components/CreateSolicitud';
import Login from './components/Login';
import PageError from './components/PageError';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/registro' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route path='/crearSolicitud' component={CrearSolicitud} />
        <Route path='/addBook' component={AddLibro} />
        <Route path='/editBook/:id' component={AddLibro} />
        <Route component={PageError} />
      </Switch>
    </Router>
  );
}

export default App;
