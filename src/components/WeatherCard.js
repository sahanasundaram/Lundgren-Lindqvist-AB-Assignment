import React from 'react';
import { formatTemperature, capitalize } from '../utils/helper';

const WeatherCard = ({ weather }) => {
    const { name, main, weather: weatherDetails } = weather;
  
    return (
      <div className="weather-card">
        <h2>{name}</h2>
        <p>{capitalize(weatherDetails[0].description)}</p>
        <p>Temperature: {formatTemperature(main.temp)}</p>
        <p>Humidity: {main.humidity}%</p>
      </div>
    );
  };
  
  export default WeatherCard;
  