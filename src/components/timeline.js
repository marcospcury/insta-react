import React from 'react';
import PhotoItem from './photo/photo-item';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PubSub from 'pubsub-js';

export default class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = { photos: [] };
  }

  componentWillMount() {
    PubSub.subscribe('timeline-refresh', (topico, photos) => {
      this.setState({ photos: photos });
    });

    PubSub.subscribe('liker-update', (topico, likeInfo) => {
      const foundPhoto = this.state.photos.find(photo => photo.id === likeInfo.photoId);
      const foundLiker = foundPhoto.likers.find(liker => liker.login === likeInfo.liker.login);
      foundPhoto.likeada = !foundPhoto.likeada;
      if (foundLiker === undefined) {
        foundPhoto.likers.push(likeInfo.liker);
      }
      else {
        const likersUpdate = foundPhoto.likers.filter(liker => liker.login !== likeInfo.liker.login);
        foundPhoto.likers = likersUpdate;
      }
      this.setState({ photos: this.state.photos });
    });

    PubSub.subscribe('new-comment', (topico, commentInfo) => {
      const foundPhoto = this.state.photos.find(photo => photo.id === commentInfo.photoId);
      foundPhoto.comentarios.push(commentInfo.newComment);
      this.setState({ photos: this.state.photos });
    });
  }

  like(photoId) {
    fetch(`http://localhost:8080/api/fotos/${photoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, { method: 'POST' })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Não foi possível realizar o like da foto");
        }
      })
      .then(liker => {
        PubSub.publish('liker-update', { photoId: photoId, liker });
      });
  }

  postComment(photoId, comment) {
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({ texto: comment }),
      headers: new Headers({
        'Content-type': 'application/json'
      })
    };

    fetch(`http://localhost:8080/api/fotos/${photoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, requestInfo)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("não foi possível comentar");
        }
      })
      .then(newComment => {
        PubSub.publish('new-comment', { photoId: photoId, newComment });
      });
  }

  render() {
    return (
      <div className="fotos container">
        <ReactCSSTransitionGroup
          transitionName="timeline"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {
            this.state.photos.map(photo => <PhotoItem key={photo.id} photo={photo} like={this.like} postComment={this.postComment} />)
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}