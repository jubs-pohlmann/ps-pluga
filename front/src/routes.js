import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Ferramentas from './pages/ferramentas'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Ferramentas} />
                {/* <Route path="/ferramentas" component={Ferramentas} /> */}
            </Switch>
        </BrowserRouter>
    );
}