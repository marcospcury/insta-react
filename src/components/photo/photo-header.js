import React from 'react';
import { Link } from 'react-router-dom';

export default class PhotoHeader extends React.Component {
  render() {
    return (
      <header className="foto-header">
        <figure className="foto-usuario">
          <img src={this.props.photo.urlPerfil} alt="Users profile image" />
          <figcaption className="foto-usuario">
            <Link to={`/profile/${this.props.photo.loginUsuario}`}>{this.props.photo.loginUsuario}</Link>
          </figcaption>
        </figure>
        <time className="foto-data">{this.props.photo.horario}</time>
      </header>
    );
  }
}