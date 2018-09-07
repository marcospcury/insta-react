import React from 'react';

export default class PhotoHeader extends React.Component {
  render() {
    return (
      <header className="foto-header">
        <figure className="foto-usuario">
          <img src={this.props.photo.urlPerfil} alt="Users profile image" />
          <figcaption className="foto-usuario">
            <a href="#">{this.props.photo.loginUsuario}</a>
          </figcaption>
        </figure>
        <time className="foto-data">{this.props.photo.horario}</time>
      </header>
    );
  }
}