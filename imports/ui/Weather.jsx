import React, { Component, PropTypes } from 'react';
import { check } from 'meteor/check'
import { HTTP } from 'meteor/http';
//import weather from '../api/weather'
import App from './App'
import ReactDom from 'react-dom';

//console.log()

export default class Weather extends Component {
	render(){
		if(this.props.data.name != undefined){
			//console.log(this.props.data.name);
			let cityName = this.props.data.name;
			let temperature = this.props.data.main.temp;
			let celTemp = Math.round(temperature - 273.15);
			let press = this.props.data.main.pressure;
			let hum = this.props.data.main.humidity;
			let minTemp = this.props.data.main.temp_min;
			let minCTemp = Math.round(minTemp - 273.15);
			let maxTemp = this.props.data.main.temp_max;
			let maxCTemp = Math.round(maxTemp - 273.15);
			let windSpeed = this.props.data.wind.speed;
			let windDegree = this.props.data.wind.deg;
			let cond = this.props.data.weather[0].main;
			let subCond = this.props.data.weather[0].description;
			let set = this.props.data.sys.sunset;
			let formattedSunset = Date(set);
			return (			
				<div className="reactWeatherInfo">
					<br/>
					<br/>
					<div className="weatherContainer">
						<div id="title"><b>Current weather conditions for {cityName}:</b></div>
						<div><label>Temperature: </label><data>{celTemp} &#8451; </data></div>
						<div><label>Pressure: </label><data>{press} hPa </data></div>
						<div><label>Humidity: </label><data>{hum} % </data></div>
						<div><label>Min Temperature: </label><data>{minCTemp} &#8451; </data></div>
						<div><label>Max Temperature: </label><data>{maxCTemp} &#8451; </data></div>
						<div><label>Wind: </label><data>{windSpeed} meters/second at {windDegree} &#176; </data></div>
						<div><label>Conditions: </label><data>{cond} with {subCond}</data></div>
						<div><label>Sunset: </label><data>{formattedSunset}</data></div>
					</div>
				</div>
				)
		}
		else{
			return null;
		}
	}
}