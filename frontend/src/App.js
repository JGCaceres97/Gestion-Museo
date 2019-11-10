import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AddLibro from './components/AddLibro';
import CrearSolicitud from './components/CrearSolicitud';
import Login from './components/Login';
import PageError from './components/PageError';
import Registro from './components/Registro';
import Calendario from './components/Calendario';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/registro' component={Registro} />
        <Route path='/login' component={Login} />
        <Route path='/crearSolicitud' component={CrearSolicitud} />
        <Route path='/calendario' component={Calendario} />
        <Route path='/addBook' component={AddLibro} />
        <Route path='/editBook/:id' component={AddLibro} />
        <Route component={PageError} />
      </Switch>
    </Router>
  );
}

export default App;
