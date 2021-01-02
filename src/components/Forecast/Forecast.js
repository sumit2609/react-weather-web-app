import React, { useState } from 'react';
import Conditions from '../Conditions/Conditions.js';
import classes from './Forecast.module.css';

const api = {
    key: "439d4b804bc8187953eb36d2a8c26a02",
    base: "https://openweathermap.org/data/2.5/",
}



const Forecast = () => {
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);
    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('imperial');
    let [responseObj, setResponseObj] = useState({});
    // const uriEncodedCity = encodeURIComponent(city);
    function getForecast(e) {
        // weather data fetch function will go here
        e.preventDefault();

        if (city.length === 0) {
            return setError(true);
        }
        //Clear stste in preparation for new data
        setError(false);
        setResponseObj({});

        setLoading(true);

        // fetch("https://openweathermap.org/data/2.5/weather?units=${unit}&q={uriEncodedCity}&appid=439d4b804bc8187953eb36d2a8c26a02")
        fetch(`${api.base}weather?units=${unit}&q=${city}&appid=${api.key}`)
        .then(response => response.json())
        .then(response => {
            if (response.cod !== 200) {
                throw new Error()
            }

            setResponseObj(response)
            setLoading(false);
        })
        .catch(err =>  {
            setError(true);
            setLoading(false);
            console.log(err.message);
        });
    }

    return (
        // JSX code will go here
        <div>
            <h2>Find The Current Weather Conditions</h2>
            <form onClick={getForecast}>
                <input
                    type="text"
                    placeholder="Enter City"
                    maxLength="50"
                    className={classes.textInput}
                    value={city}
                    onChange={(e) => 
                    setCity(e.target.value)}
                    />
                <label>
                    <input
                        type="radio"
                        name="units"
                        className={classes.Radio}
                        checked={unit ===
                        "imperial"}
                        value="imperial"
                        onChange={(e) => 
                        setUnit(e.target.value)}
                        />
                    Fahrenheit
                </label>
                <label>
                    <input
                        type="radio"
                        name="units"
                        className={classes.Radio}
                        checked={unit === "metric"}
                        value="metric"
                        onChange={(e) =>
                        setUnit(e.target.value)}
                        />
                    Celcius
                </label>
                
                <button className={classes.Button} type="submit">Get Forecast</button>
            </form>
            <Conditions
             responseObj={responseObj}
             error={error}
             loading={loading}
             />
        </div>
    )
}

export default Forecast;
