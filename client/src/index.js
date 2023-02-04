import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App';
import Auth from './auth/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';

import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const auth = new Auth(history);

const handleAuthentication = async (props) => {
    const { location } = props;
    if (/access_token|id_token|error/.test(location.hash)) {
        const result = auth.handleAuthentication();
        return result;
    }
};

const store = createStore(reducer, middleware);

ReactDOM.render(
    <Router history={history}>
        <Provider store={store}>
            <App auth={auth} handleAuthentication={handleAuthentication}/>
        </Provider>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
