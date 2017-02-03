import React, { Component } from 'react';
import Weather from './Weather.jsx'
import ReactDom from 'react-dom';
//import weather from '../api/weather';

const apiKey = '431376f6dc637c54ae43544634117145'

export default class App extends Component {

	constructor(props){
		super(props);
		this.state = {weatherData: {}};
	}

	ClickWeatherButton(event){
		event.preventDefault();
		let zipCode = ReactDom.findDOMNode(this.refs.zipCode).value.trim();
		let countryCode = ReactDom.findDOMNode(this.refs.countryCode).value.trim();
		this.getWeatherInfo(zipCode, countryCode);
		this.renderWeather();
		let form = document.getElementById("weatherForm");
		//let weatherSheet = document.getElementByClassName("weatherContainer");
  		//$( ".weatherContainer" ).fadeTo( "slow" , 1, function() {
    		// Animation complete.
		//	});
		//function(){
		//	let weatherContainer = document.getElementById("reactWeatherInfo");


		//}
		//console.log(weatherContainer);
		form.reset();
	}

	getWeatherInfo(zipCode, countryCode){
		//console.log(countryCode);
		//console.log(zipCode);
		if(Meteor.isClient){
			Meteor.call("getWeatherData", zipCode, countryCode, function(error,results){
				try{
					console.log(results);
					if(error)
						console.log("Error in retrieving weather data" + error);
					else{
						console.log(JSON.parse(results));
						this.setState({weatherData: JSON.parse(results)});
					}
				}
				catch(err){
					console.log("Error in Meteor Call: " + err);
				}
				//var data = JSON.parse(results)
				//this.parseWeather(data)
			}.bind(this));
		}
	}
/*
	parseWeather(data){
		let name = data.name;
		let temperature = data.main.temp;
		let pressure = data.main.pressure;
		let humidity = data.main.humidity;
 		let tempMin = data.main.temp_min;
		let tempMax = data.main.temp_max;
		let windSpeed = data.wind.speed;
		let windAngle = data.wind.deg;
		let sunset = data.sys.sunset
		let formattedSunset = Date(sunset);
		let overallConditions = data.weather[0].main;
		let conditions = data.weather[0].description;
		console.log("Weather for the city of " + name);
		console.log("Temperature: " + temperature);
		console.log("Pressure: " + pressure);
		console.log("Humidity: " + humidity);
		console.log("Max Temperature: " + tempMax);
		console.log("Min Temperature: " + tempMin);
		console.log("Wind: " + windSpeed + " at " + windAngle);
		console.log("Conditions: " + overallConditions + " with " + conditions);
		console.log("Sunset: " + formattedSunset);
	}
*/

	renderWeather(){
		if(this.state.weatherData){
			return <Weather data={this.state.weatherData} />
		}
	}

	render(){
		return (
			<div className="container">
				<header>
				<h2 id="heading"><b>Weather App</b></h2>
				<p>Powered by <a href="https://openweathermap.org">openweathermap.org</a></p>
				</header>
				<main>
					<form id="weatherForm" className="weather-info">
						<label type="text" ref="zipCode"></label>
						<input id="zippy" type='text' ref="zipCode" placeholder='Enter ZIP code'/>
						<br/>
						<br/>
						<label type="text" ref="countryCode"></label>
						<input id="county" type='text' ref="countryCode" placeholder='Enter country code'/>
						<br/>
						<br/>
						<button id="getWeather" onClick={this.ClickWeatherButton.bind(this)} type='submit'>Get Weather</button>
					</form>
					<div className="weatherInfo">
						{this.renderWeather()}
					</div>
				</main>
			</div>
		);
	}
}
