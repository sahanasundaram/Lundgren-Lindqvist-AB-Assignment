
const GEOLOCATION_URL = 'http://ip-api.com/json/';

export const fetchWeather = async (lat, lon) => {
  const url = `https://wttr.in/?format=j1&lat=${lat}&lon=${lon}`; // Using wttr.in without API key
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data.');
  }
  const data = await response.json();
  return {
    name: data.nearest_area[0].areaName[0].value,
    main: {
      temp: data.current_condition[0].temp_C,
      humidity: data.current_condition[0].humidity
    },
    weather: [
      {
        description: data.current_condition[0].weatherDesc[0].value
      }
    ]
  };
};

export const fetchUserLocation = async () => {
  const response = await fetch(GEOLOCATION_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch location data.');
  }
  return response.json();
};