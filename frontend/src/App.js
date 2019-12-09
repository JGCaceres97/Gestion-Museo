// @ts-check
import './styles/App.scss';
import React from 'react';
import { routes } from './config';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import CrearSolicitud from './components/CrearSolicitud';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={routes.home} component={Dashboard} />
        <Route exact path={routes.login} component={Login} />
        <Route exact path={routes.solicitud} component={CrearSolicitud} />
        <Route exact path={routes.resetPassword} component={ResetPassword} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
