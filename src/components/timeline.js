import React from 'react';
import PhotoItem from './photo/photo-item';

export default class Timeline extends React.Component {

  render() {
    return (
      <div className="fotos container">
        {
          this.props.photos.map(photo => <PhotoItem key={photo.id} photo={photo} />)
        }
      </div>
    );
  }
}