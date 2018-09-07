import React from 'react';
import { Redirect } from 'react-router-dom';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = { errorMessage: '' };
  }

  handleSubmit(event) {
    event.preventDefault();
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({ login: this.login.value, senha: this.password.value }),
      headers: new Headers({
        'Content-type': 'application/json'
      })
    };
    fetch('http://localhost:8080/api/public/login', requestInfo)
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('Could not login to Insta-React');
        }
      })
      .then(token => {
        localStorage.setItem('auth-token', token);
        this.setState({ redirectTo: '/timeline' });
      })
      .catch(error => {
        this.setState({ errorMessage: error.message })
      });
  }

  render() {
    const { redirectTo } = this.state;

    if (redirectTo) {
      return <Redirect push to={redirectTo} />;
    }
    else {
      return (
        <div className="login-box">
          <h1 className="header-logo">Insta-React</h1>
          <span>{this.state.errorMessage}</span>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" ref={(input) => this.login = input} />
            <input type="password" ref={(input) => this.password = input} />
            <input type="submit" value="login" />
          </form>
        </div>
      );
    }
  }
}