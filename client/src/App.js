import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './App.css';
import { AuthProvider } from './context/auth';
import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthRoute from './util/AuthRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path='/' component={Home} />
          <Route exact path='/Blog' component={Blog} />
          <AuthRoute exact path='/Login' component={Login} />
          <AuthRoute exact path='/Register' component={Register} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
