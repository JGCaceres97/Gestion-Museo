import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PageNotFound({ ...rest }) {
  return <Route {...rest} render={() => <Redirect to='/login' />} />;
}

export default PageNotFound;
