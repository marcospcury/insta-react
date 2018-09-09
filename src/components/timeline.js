import React from 'react';
import PhotoItem from './photo/photo-item';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Timeline extends React.Component {

  render() {
    return (
      <div className="fotos container">
        <ReactCSSTransitionGroup
          transitionName="timeline"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {
            this.props.photos.map(photo => <PhotoItem key={photo.id} photo={photo} />)
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}