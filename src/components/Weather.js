import React, { useState, useEffect } from 'react';
import { Box, Text, Spinner } from '@chakra-ui/react';

const Weather = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cachedWeather = localStorage.getItem('weatherData');
    const cachedTimestamp = localStorage.getItem('weatherTimestamp');
    const thirtyMinutes = 30 * 60 * 1000;
    const now = new Date().getTime();

    if (cachedWeather && cachedTimestamp && now - cachedTimestamp < thirtyMinutes) {
      setWeather(JSON.parse(cachedWeather));
    } else {
      requestGeolocation();
    }
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetchWeather();
    }
  }, [location]);

  const fetchWeather = async () => {
    setLoading(true);
    const apiKey = '92de014c522b49c29bc135903242905';
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location.latitude},${location.longitude}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
      localStorage.setItem('weatherData', JSON.stringify(data));
      localStorage.setItem('weatherTimestamp', new Date().getTime().toString());
    } catch (error) {
      console.error('Error fetching the weather data:', error);
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const requestGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting geolocation:', error);
          setError('Failed to get geolocation');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser');
    }
  };

  return weather
  ? `${weather.current.temp_c}°C, ${weather.current.condition.text}`
  : error ? error : 'Loading weather data...';
};

export default Weather;
