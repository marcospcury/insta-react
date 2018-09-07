import React from 'react';
import PhotoItem from './photo/photo-item';

export default class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = { photos: [] };
  }

  componentDidMount() {
    fetch(`http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`)
      .then(response => response.json())
      .then(photos => {
        this.setState({ photos: photos });
      })
  }

  render() {
    return (
      <div className="fotos container">
        {
          this.state.photos.map(photo => <PhotoItem key={photo.id} photo={photo} />)
        }
      </div>
    );
  }
}