import React, { Component } from 'react';
import Weather from './containers/Weather/Weather';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className={"App"}>
        <h2>Weather App</h2>
        <Weather />
      </div>
    )
  }
}

export default App;
