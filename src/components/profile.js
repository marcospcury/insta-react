import React from 'react';
import Header from './header';
import Timeline from './timeline';
import PubSub from 'pubsub-js';

export default class Profile extends React.Component {
  componentDidMount() {
    const { login } = this.props.match.params

    fetch(`http://localhost:8080/api/public/fotos/${login}`)
      .then(response => response.json())
      .then(photos => {
        PubSub.publish('timeline-refresh', photos);
      })
  }

  render() {
    return (
      <div className="main">
        <Header />
        <Timeline />
      </div>
    );
  }
}