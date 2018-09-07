import React from 'react';
import Header from './components/header';
import Timeline from './components/timeline';

class App extends React.Component {
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
