import React from 'react';
import ReactDOM from 'react-dom';
import './css/timeline.css';
import './css/reset.css';
import './css/login.css';
import App from './App';
import Login from './components/login';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...args }) => (
  <Route
    {...args}
    render={props =>
      (localStorage.getItem('auth-token') !== null) ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
    }
  />
);

ReactDOM.render((
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Login} />
      <PrivateRoute path="/timeline" component={App} />
    </div>
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
