import React from 'react';
import Photo from './photo/photo';

export default class Timeline extends React.Component {
  render() {
    return (
      <div className="fotos container">
        <Photo />
      </div>
    );
  }
}