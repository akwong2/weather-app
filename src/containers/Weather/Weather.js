import React, { Component } from 'react';
import Axios from 'axios';
import Inputs from '../../components/Inputs/Inputs';
import './Weather.css';

const api = "2750fd418f0d3b15295bfd66db4f197c";
// http://openweathermap.org/img/wn/10d@2x.png

class Weather extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      todayTemp: null,
      todayIcon: null,
      city: "",
      country: "",
    }
    this.baseState = this.state
  }
  

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  callApi = () => {
    let country = "US";
    if (this.state.country !== "") {
      country = this.state.country
    }
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.city},${country}&units=imperial&appid=` + api
    Axios.get(url)
      .then( response => {
        console.log(response["data"])
        let name = `${response["data"]["name"]}, ${response["data"]["sys"]["country"]}`
        let temp = response["data"]["main"]["temp"];
        let icon;
        for (let i of response["data"]["weather"]) {
          icon = `http://openweathermap.org/img/wn/${i["icon"]}@2x.png `
        }
        this.setState({ name, todayTemp: temp, todayIcon: icon })
      })
      .catch( err => {
        console.log(err)
      })
  }

  handleSubmit = (event) => {
    this.callApi();
    this.setState( this.baseState )
    event.preventDefault();
  }

  render() {
    let icon;
    if (this.state.todayIcon !== null) {
      icon = <img src={this.state.todayIcon} alt="today"></img>
    }
    return (
      <div className={"Weather"}>
        <Inputs 
          change={this.handleChange}
          submit={this.handleSubmit}
          city={this.state.city}
          country={this.state.country} />
        <div className={"Location"}>
          {this.state.name}
        </div>
        <div className={"Today"}>
          {icon}
          {this.state.todayTemp}
        </div>
        <div className="Future">
        </div>
      </div>
    )
  }
}

export default Weather;
