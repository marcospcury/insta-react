import React from 'react';
import ReactDOM from 'react-dom';
import './css/timeline.css';
import './css/reset.css';
import './css/login.css';
import App from './App';
import Login from './components/login';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from "react-router-dom";

ReactDOM.render((
  <BrowserRouter>
    <div>
      <Route path="/" component={Login} />
      <Route path="/timeline" component={App} />
    </div>
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
