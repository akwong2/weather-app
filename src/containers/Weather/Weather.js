import React, { Component } from 'react';
import Axios from 'axios';
import './Weather.css';

const api = "2750fd418f0d3b15295bfd66db4f197c";
// http://openweathermap.org/img/wn/10d@2x.png

class Weather extends Component {
  state = {
    name: "HERRO",
    todayTemp: null,
    todayIcon: null
  }

  componentDidMount() {
    Axios.get("http://api.openweathermap.org/data/2.5/weather?q=burlingame,usa&units=imperial&appid=" + api)
      .then( response => {
        console.log(response["data"])
        let name = response["data"]["name"];
        let temp = response["data"]["main"]["temp"];
        let icon;
        for (let i of response["data"]["weather"]) {
          icon = `http://openweathermap.org/img/wn/${i["icon"]}@2x.png `
        }
        this.setState( {name, todayTemp: temp, todayIcon: icon})
      })
      .catch( err => console.log(err))
  }

  render() {
    console.log("RENDER")
    return (
      <div className={"Weather"}>
        <div className={"Input"}>
          Input
        </div>
        <div className={"Location"}>
          {this.state.name}
        </div>
        <div className={"Today"}>
          <img src={this.state.todayIcon}></img>
          {this.state.todayTemp}
        </div>
        
      </div>
    )
  }
}

export default Weather;
