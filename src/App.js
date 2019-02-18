import React, { Component } from 'react';
import * as Container from './Containers/index';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
          <Router>
            <Switch>
              <Route exact path="/" component={Container.Login}/>
              <Route exact path="/chatscreen" component={Container.Chatscreen}/>
            </Switch>
          </Router>
      </div>
    );
  }
}

export default App;
