import React from 'react';
import Header from './components/header';
import Timeline from './components/timeline';
import PubSub from 'pubsub-js';

class App extends React.Component {
  componentDidMount() {
    fetch(`http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`)
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

export default App;
