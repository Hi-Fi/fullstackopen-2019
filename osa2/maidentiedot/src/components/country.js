import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = (props) => {
    let country = props.country
    const [ weather, setWeather] = useState() 

    useEffect(() => {
        axios
          .get(`https://api.apixu.com/v1/current.json?key=<key></key>&q=${props.country.capital}`)
          .then(response => {
            setWeather(response.data)
          })
      }, [])
    
    const Languages = (props) => {
        let i = 0
        return (
            props.languages.map ( language => 
            <li key={i++}>{language.name}</li>
            )
        )
    }

    const Weather = (props) => {
        console.log(weather)
        if (weather) {
            return (
                <div id="Weather">
                <h2>Weather in {country.capital}</h2>
                <p><b>Temparature:</b>{weather.current.temp_c} °C</p>
                <img src={weather.current.condition.icon} alt={weather.current.condition.text} width="100px"/>
                <p><b>Wind:</b>{weather.current.wind_kph} kph direction {weather.current.wind_dir}</p>
                </div>
            )
        } else {
            return (
                <div>No weather information available</div>
            )
        }
    }

    return (
    <div id={country.name}>
        <h1>
            {country.name} 
        </h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>Languages</h2>
        <ul>
            <Languages languages={country.languages} />
        </ul>
        <img src={country.flag} alt="Country flag" width="100px"/>
        <Weather />
        
        

    </div>
    )
} 
  
  export default Country