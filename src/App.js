import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Home from './routes/Home';

export const App = () => (
    <Router history={createBrowserHistory()}>
        <Switch>
            <Route exact path="/" component={Home} />
        </Switch>
    </Router>
);
