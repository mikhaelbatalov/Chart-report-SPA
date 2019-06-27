import React, { Fragment } from 'react';
import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import Report from './Report';
import About from './About';
import Footer from './Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => (

  <Router>
    <Fragment>
      <Header />
      <Nav />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/report" component={Report} />
        <Route path="/about" component={About} />
      </Switch>
      <Footer />
    </Fragment>
  </Router>
);

export default App;