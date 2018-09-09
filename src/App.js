import React from 'react';
import Header from './components/header';
import Timeline from './components/timeline';
import PubSub from 'pubsub-js';

class App extends React.Component {
  constructor() {
    super();
    this.state = { photos: [] };
  }

  componentWillMount() {
    PubSub.subscribe('search-executed', (topic, photos) => {
      this.setState({ photos: photos });
    });
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
      <div className="main">
        <Header />
        <Timeline photos={this.state.photos} />
      </div>
    );
  }
}

export default App;
