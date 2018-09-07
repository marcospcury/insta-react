import React from 'react';

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
          throw new Error("não foi possível realizar o like da foto");
        }
      })
      .then(like => {
        this.setState({ liked: !this.state.liked })
      });
  }

  render() {
    return (
      <section className="fotoAtualizacoes">
        <a onClick={this.like.bind(this)} className={this.state.liked ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Like</a>
        <form className="fotoAtualizacoes-form">
          <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" />
          <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit" />
        </form>
      </section>
    );
  }
}