// @ts-check
import './styles/App.scss';
import React from 'react';
import { routes } from './config';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import CrearSolicitud from './components/CrearSolicitud';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route exact path={routes.login} component={Login} />
        <Route exact path={routes.solicitud} component={CrearSolicitud} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
