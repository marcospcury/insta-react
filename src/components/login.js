import React from 'react';

export default class Login extends React.Component {
  render() {
    return (
      <div className="login-box">
        <h1 className="header-logo">Insta-React</h1>
        <form>
          <input type="text" />
          <input type="password" />
          <input type="submit" value="login" />
        </form>
      </div>
    );
  }
}