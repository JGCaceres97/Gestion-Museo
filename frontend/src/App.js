import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import AddLibro from './components/AddLibro';
import CreateSolicitud from './components/CreateSolicitud';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <Navigation />

      <Route path='/create' exact component={CreateSolicitud} />
      <Route path='/add' component={AddLibro} />
      <Route path='/edit/:id' component={AddLibro} />
    </Router>
  );
}

export default App;
