import React, { Component } from 'react';
import Weather from './containers/Weather/Weather';

class App extends Component {
  render() {
    return (
      <div>
        <h2>Weather App</h2>
        <Weather />
      </div>
    )
  }
}

export default App;
