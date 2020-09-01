import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { WineApp, RegionsPage, WineListPage, WinePage, NotFound } from './components';
import './index.css';

class RoutedApp extends Component {
  render() {
    return (
      <Router>
        <WineApp />
        <Switch>
          <Route exact path="/" component={RegionsPage} />
          <Route exact path="/regions/:regionId" component={WineListPage} />
          <Route path="/regions/:regionId/wines/:wineId" component={WinePage} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(<RoutedApp />, document.getElementById('root'));
