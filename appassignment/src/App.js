import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadSpinner';
import { fetchWeather, fetchUserLocation } from './utils/api';
import './App.css';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocationAndFetchWeather = async () => {
      try {
        let latitude, longitude;

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              latitude = position.coords.latitude;
              longitude = position.coords.longitude;
              const data = await fetchWeather(latitude, longitude);
              setWeather(data);
            },
            async () => {
              // Fallback to IP-based geolocation
              const location = await fetchUserLocation();
              latitude = location.lat;
              longitude = location.lon;
              const data = await fetchWeather(latitude, longitude);
              setWeather(data);
            }
          );
        } else {
          // Fallback to IP-based geolocation
          const location = await fetchUserLocation();
          latitude = location.lat;
          longitude = location.lon;
          const data = await fetchWeather(latitude, longitude);
          setWeather(data);
        }
      } catch (err) {
        setError('Failed to retrieve weather data.');
      } finally {
        setLoading(false);
      }
    };

    getLocationAndFetchWeather();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (weather) return <WeatherCard weather={weather} />;
  return null;
};

export default App;
