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
      todayDate: null,
      city: "",
      country: "",
      forecast: {},
      forecastOrder: [],
      forecastHighlight: []
    }
    this.baseState = this.state
  }
  
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  timeFrame = (time) => {
    if (0 <= time && time < 3) return 0;
    else if (3 <= time && time < 6) return 3;
    else if (6 <= time && time < 9) return 6;
    else if (9 <= time && time < 12) return 9;
    else if (12 <= time && time < 15) return 12;
    else if (15 <= time && time < 18) return 15;
    else if (18 <= time && time < 21) return 18;
    else if (21 <= time && time < 24) return 21;
  }

  callApi = () => {
    let country = "US";
    if (this.state.country !== "") {
      country = this.state.country
    }
    let weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.city},${country}&units=imperial&appid=` + api
    Axios.get(weatherUrl)
      .then( response => {
        console.log(response["data"])
        let name = `${response["data"]["name"]}, ${response["data"]["sys"]["country"]}`
        let temp = response["data"]["main"]["temp"];
        let icon = `http://openweathermap.org/img/wn/${response["data"]["weather"][0]["icon"]}@2x.png`;
        let date = new Date();
        let today = `${date.getMonth()+1}/${date.getDate()}`
        this.setState({ name, todayTemp: temp, todayIcon: icon, todayDate: today })
      })
      .catch( err => {
        console.log(err)
      })
    let forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city},${country}&units=imperial&appid=` + api
    Axios.get(forecastUrl)
      .then( response => {
        let forecast = {};
        let forecastOrder = [];
        let forecastHighlight = [];
        let today = new Date();
        let time = this.timeFrame(today.getHours());
        console.log(time);
        for (let i in response["data"]["list"]) {
          let entry = response["data"]["list"][i]
          let date = new Date(entry["dt_txt"])
          let newDate = `${date.getMonth()+1}/${date.getDate()}`;
          if (forecast[newDate]) {
            forecast[newDate]["hourly"].push({
              "time": entry["dt_txt"],
              "temp": entry["main"]["temp"],
              "icon": entry["weather"][0]["icon"],
              "iconUrl": `http://openweathermap.org/img/wn/${entry["weather"][0]["icon"]}@2x.png`
            })
          }
          else {
            forecast[newDate] = {
              "date": newDate,
              "hourly": [{
                "time": entry["dt_txt"],
                "temp": entry["main"]["temp"],
                "icon": entry["weather"][0]["icon"],
                "iconUrl": `http://openweathermap.org/img/wn/${entry["weather"][0]["icon"]}@2x.png`
              }]
            }
            //forecastOrder.push(newDate)
          }
          let d = new Date(entry["dt_txt"]);
          if (d.getHours() === time) {
            forecastOrder.push(newDate)
            forecastHighlight.push(
              {
                "date": newDate,
                "time": entry["dt_txt"],
                "temp": entry["main"]["temp"],
                "icon": entry["weather"][0]["icon"],
                "iconUrl": `http://openweathermap.org/img/wn/${entry["weather"][0]["icon"]}@2x.png`
              }
            )
          };
        }
        console.log(forecastOrder)
        console.log(forecast)
        console.log(forecastHighlight);
        this.setState({ forecast, forecastOrder, forecastHighlight })
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

  handleClick = (event) => {
    console.log(event.target)
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
          {this.state.todayDate}
          {icon}
          {this.state.todayTemp}
        </div>
        <div className="Future">
          <div className="Highlight">{this.state.forecastHighlight.map( (item, i) => {
            return  <div key={i}>
                      {item["date"]}
                      {<img src={item["iconUrl"]} alt={"image" + item["date"]}></img>}
                      {item["temp"]}
                    </div>
          })}</div>
          <div className="Hourly"></div>
        </div>
      </div>
    )
  }
}

export default Weather;
