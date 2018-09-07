import React from 'react';
import PubSub from 'pubsub-js';

export default class PhotoUpdates extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: props.photo.likeada };
  }

  like(event) {
    event.preventDefault();
    fetch(`http://localhost:8080/api/fotos/${this.props.photo.id}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, { method: 'POST' })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Não foi possível realizar o like da foto");
        }
      })
      .then(liker => {
        this.setState({ liked: !this.state.liked });
        PubSub.publish('liker-update', { photoId: this.props.photo.id, liker });
      });
  }

  postComment(event) {
    event.preventDefault();
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({ texto: this.comment.value }),
      headers: new Headers({
        'Content-type': 'application/json'
      })
    };

    fetch(`http://localhost:8080/api/fotos/${this.props.photo.id}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, requestInfo)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("não foi possível comentar");
        }
      })
      .then(newComment => {
        PubSub.publish('new-comment', { photoId: this.props.photo.id, newComment });
      });
  }

  render() {
    return (
      <section className="fotoAtualizacoes">
        <a onClick={this.like.bind(this)} className={this.state.liked ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Like</a>
        <form className="fotoAtualizacoes-form" onSubmit={this.postComment.bind(this)}>
          <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" ref={input => this.comment = input} />
          <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit" />
        </form>
      </section>
    );
  }
}