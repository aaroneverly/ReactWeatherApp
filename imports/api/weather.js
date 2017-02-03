import { Meteor } from 'meteor/meteor';
import App from '../ui/App';

//console.log(apiKey);
const apiKey = '431376f6dc637c54ae43544634117145'


if(Meteor.isServer){

	Meteor.methods({

		getWeatherData(zipCode, countryCode, apiKey){
			//console.log(zipCode, countryCode, apiKey);
			let auth = '&APPID=431376f6dc637c54ae43544634117145'
			let url = 'http://api.openweathermap.org/data/2.5/weather?' + 'zip=' + zipCode + ',' + countryCode + auth
			let result = '';
			try {
				let callResult = HTTP.call('GET', url,{});
				result = callResult.content;
				console.log(result);
			}
			catch(callErr){
				console.log("Call Error: " + callErr);
			}
			finally {
				console.log("finally")
				return result;
			}
		},
	});
}