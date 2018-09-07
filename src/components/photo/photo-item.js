import React from 'react';
import PhotoHeader from './photo-header';
import PhotoInfo from './photo-info';
import PhotoUpdates from './photo-updates';

export default class PhotoItem extends React.Component {
  render() {
    return (
      <div className="foto">
        <PhotoHeader photo={this.props.photo} />
        <img alt="foto" className="foto-src" src={this.props.photo.urlFoto} />
        <PhotoInfo photo={this.props.photo} />
        <PhotoUpdates />
      </div>
    );
  }
}