import React from 'react';
import { Link } from 'react-router-dom';

export default class PhotoInfo extends React.Component {
  render() {
    return (
      <div className="foto-info">
        <div className="foto-info-likes">
          {
            this.props.photo.likers.map((liker) => {
              return (<Link to={`/profile/${liker.login}`}>{liker.login}, </Link>)
            })
          }
          curtiram
        </div>
        <p className="foto-info-legenda">
          <a className="foto-info-autor">{this.props.photo.loginUsuario} </a>
          {this.props.photo.comentario}
        </p>
        <ul className="foto-info-comentarios">
          {this.props.photo.comentarios.map(comment => {
            return (
              <li className="comentario" key={comment.id}>
                <Link to={`/profile/${comment.login}`} className="foto-info-autor">{comment.login} </Link>
                {comment.texto}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}