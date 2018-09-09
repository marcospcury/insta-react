import React from 'react';
import PubSub from 'pubsub-js';

export default class Header extends React.Component {
  search(event) {
    event.preventDefault();
    fetch(`http://localhost:8080/api/public/fotos/${this.searchTerm.value}`)
      .then(response => response.json())
      .then(photos => {
        PubSub.publish('timeline-refresh', photos);
      })
  }

  render() {
    return (
      <header className="header container">
        <h1 className="header-logo">Insta-React</h1>
        <form className="header-busca" onSubmit={this.search.bind(this)}>
          <input type="text" name="search" placeholder="Pesquisa" className="header-busca-campo" ref={(input) => this.searchTerm = input} />
          <input type="submit" value="Buscar" className="header-busca-submit" />
        </form>
        <nav>
          <ul className="header-nav">
            <li className="header-nav-item">
              <a href="#">♡</a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}