import React from 'react';

export default class PhotoUpdates extends React.Component {
  like(event) {
    event.preventDefault();
    this.props.like(this.props.photo.id);
  }

  postComment(event) {
    event.preventDefault();
    this.props.postComment(this.props.photo.id, this.comment.value);
  }

  render() {
    return (
      <section className="fotoAtualizacoes">
        <a onClick={this.like.bind(this)} className={this.props.photo.likeada ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Like</a>
        <form className="fotoAtualizacoes-form" onSubmit={this.postComment.bind(this)}>
          <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" ref={input => this.comment = input} />
          <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit" />
        </form>
      </section>
    );
  }
}