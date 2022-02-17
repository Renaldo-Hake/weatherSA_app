import React, { Component } from 'react';

// images for background
import clear from "../images/clear.jpg"
import overcast from "../images/overcast.jpg"
import rain from "../images/rain.jpg"
import sattered from "../images/sattered.jpg"
import wind from "../images/wind.jpg"
import thunderstorm from "../images/thunderstorm.jpg"
import mist from "../images/mist.jpg"
import earth from "../images/earth.jpg"

class WeatherUI extends Component {

    constructor(props) {
        super(props)

        this.state = {
            city : [],
            weather: [],
            main: [],
            cities: [],
            forecast: [],
        }

        this.getData = this.getData.bind(this);
    }

    // get the main card of the day weathter results
    getData(){
        const location = document.querySelector("#location").value;

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location},za&appid=fff49387aba942f1cb13a1bf190a067a&units=metric`)
                .then(res => res.json())
                .then(result => {
                    this.setState({
                        city: result,
                        weather: result.weather[0],
                        main: result.main
                    })
                    this.getforecast();
                    document.querySelector(".card").style.display = "block"
                })
    }

    // get the forcast for the week
    getforecast() {
        const lat = this.state.city.coord.lat;
        const lon = this.state.city.coord.lon
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=fff49387aba942f1cb13a1bf190a067a&units=metric`)
            .then(res => res.json())
            .then( result => {
                this.setState({
                    forecast: result.daily,
                })
            })
    }

    // creating the dates for the forecast
    getDates() {
        const day = new Date();
        const week = [];

        // get the dates in milliseconds
        for(let i = 1; i < 9; i++){
            let nextDay = new Date();
            nextDay = nextDay.setDate(day.getDate() + i)
            week.push(nextDay)
        }

        const dates = [];

        // change the milliseconds into actual dates and cut only
        // the required data, need to make this a string
        for(let i = 0; i < week.length; i++) {
            let day = new Date(week[i]);
            day = JSON.stringify(day);
            dates.push(day.substring(1,11))
        }

        return dates;
    }

    render(){
        // get all the data that we need to display in the browser
        const currentCity = this.state.city;
        const currentWeather = this.state.weather;
        const main = this.state.main
        const forecast = this.state.forecast

        // background property with a default background image
        let backgroundUrl = earth;

        // this is our dates that is displayed in the forecast
        const data = this.getDates();

    
        let i = 0

        // change the background image depending on the weather
        const description = this.state.weather.description

        if(description === 'rain' || description === " shower rain") {
            backgroundUrl = rain
        } 
        else if(description === "overcast clouds"){
            backgroundUrl = overcast
        }
        else if(description === 'clear sky') {
            backgroundUrl = clear
        }
        else if (description === 'scattered clouds' || description === "few clouds"){
            backgroundUrl = sattered
        }
        else if(description === "wind") {
            backgroundUrl = wind
        }
        else if(description === "thunderstorm") {
            backgroundUrl = thunderstorm
        }
        else if(description === "mist") {
            backgroundUrl = mist
        }


        return (
            <div>
                <div className="card-container" style={{backgroundImage: `url("${backgroundUrl}")`}}>
                    <div className="shade"></div>
                    <div className="flex">
                        <div className="card">
                            <div className="card-content">
                                <p>{currentCity.name}</p>
                                <img src={
                                    `http://openweathermap.org/img/w/${currentWeather.icon}.png`
                                    }/>
                                <h4>{main.temp}˚C</h4>
                                <p>{currentWeather.description}</p>
                                <div className="maxMin">
                                    <p>Max: {main.temp_max}˚C</p>
                                    <p>Min: {main.temp_min}˚C</p>
                                </div>
                            </div>
                        </div>
                        <div className="form">
                            <form className="citySearch">
                                <input type="text" placeholder="City" id="location"/>
                                <button type="button" onClick={() => this.getData()}>Search</button>
                            </form>
                        </div>
                    </div>
                    <div className="forecast">
                        {forecast.map(item => {
                            return(
                                <div className="forecast-Card" key={item.dt}>
                                    <h4>{
                                        data[i++]
                                    }</h4>
                                    <img src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} />
                                    <div>
                                        <p style={{color: "orange"}}>{item.temp.max}˚C</p>
                                        <p style={{color: "aqua"}}>{item.temp.min}˚C</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div style={{color: "white", padding: "1em"}}>
                    Designed by: Renaldo Hake
                </div>
            </div>
        )
    }
}

export default WeatherUI