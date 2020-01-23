// @ts-check
import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import ResetPassword from './components/ResetPassword';
import { routes } from './config';
import './styles/App.scss';

/**
 * Función que maneja las rutas de la aplicación.
 */
function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute exact component={ResetPassword} path={routes.resetPassword} />
        <PublicRoute exact restricted component={Login} path={routes.login} />
        <PrivateRoute exact component={Dashboard} path={routes.home} />
        <PageNotFound />
      </Switch>
    </Router>
  );
}

export default App;
