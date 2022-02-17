import React, { Component } from "react";

class PopularCities extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cities = []
        }

        this.getCities = this.getCities.bind(this);
    }

    // loop through the selected cities and fetch the data and store
    getCities() {
        const cities = ['Johannesburg', 'Pretoria', 'Durban', 'Cape Town', 'Bloemfontein', 'Port Elizabeth']

        for(let i = 0; i < cities.length; i++) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cities[i]},za&appid=fff49387aba942f1cb13a1bf190a067a&units=metric`)
                .then(res => res.json())
                .then(result => {
                    this.setState({
                        city: result,
                        weather: result.weather[0],
                        main: result.main
                    })
                    document.querySelector(".card").style.display = "block"
                })
        }
    }


     render() {
         return (
             <div>
                 
             </div>
         )
     }
}