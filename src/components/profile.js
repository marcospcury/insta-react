import React from 'react';
import Header from './header';
import Timeline from './timeline';

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = { photos: [] };
  }

  componentDidMount() {
    const { login } = this.props.match.params

    fetch(`http://localhost:8080/api/public/fotos/${login}`)
      .then(response => response.json())
      .then(photos => {
        this.setState({ photos: photos });
      })
  }

  render() {
    return (
      <div className="main">
        <Header />
        <Timeline photos={this.state.photos} />
      </div>
    );
  }
}