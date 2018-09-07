import React from 'react';
import { Link } from 'react-router-dom';
import PubSub from 'pubsub-js';

export default class PhotoInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { likers: this.props.photo.likers };
  }

  componentWillMount() {
    PubSub.subscribe('liker-update', (topico, likeInfo) => {
      if (this.props.photo.id === likeInfo.photoId) {
        const foundLiker = this.state.likers.find(liker => liker.login === likeInfo.liker.login);
        if (foundLiker === undefined) {
          const likersUpdate = this.state.likers.concat(likeInfo.liker);
          console.log(likersUpdate);
          this.setState({ likers: likersUpdate });
        }
        else {
          const likersUpdate = this.state.likers.filter(liker => liker.login !== likeInfo.liker.login);
          console.log(likersUpdate);
          this.setState({ likers: likersUpdate });
        }
      }
    });
  }

  render() {
    return (
      <div className="foto-info">
        <div className="foto-info-likes">
          {
            this.state.likers.map((liker) => {
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