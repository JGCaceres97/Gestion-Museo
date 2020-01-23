import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import IsLogin from '../utils/isLogin';

function PublicRoute({ component: Component, restricted = false, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (IsLogin() && restricted ? <Redirect to='/' /> : <Component {...props} />)}
    />
  );
}

export default PublicRoute;
