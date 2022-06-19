import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Home from './routes/Home';
import MaterialUI from './design-systems/material-ui/Index';

// import 'bootstrap/scss/bootstrap.scss';

import './components/layout.scss';

export const App = () => (
    <Router history={createBrowserHistory()}>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/material-ui" component={MaterialUI} />
        </Switch>
    </Router>
);
