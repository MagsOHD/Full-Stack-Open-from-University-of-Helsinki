import { useEffect, useState } from 'react';
import dataService from '../services/dataService';

const Weather = ({ country }) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    const capital = country.capital ? country.capital[0] : null;
    const capitalInfo = country.capitalInfo;

    useEffect(() => {
        if (capitalInfo && capitalInfo.latlng) {
            const [lat, lon] = capitalInfo.latlng;
            dataService.getWeather(lat, lon)
                .then(data => {
                    setWeather(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching weather:', error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [capitalInfo]);

    if (!capital) {
        return null;
    }

    if (loading) {
        return (
            <div>
                <h3>Weather in {capital}</h3>
                <p>Loading weather data...</p>
            </div>
        );
    }

    if (!weather) {
        return (
            <div>
                <h3>Weather in {capital}</h3>
                <p>Weather data not available</p>
            </div>
        );
    }

    return (
        <div>
            <h3>Weather in {capital}</h3>
            <p>Temperature: {weather.main.temp} °C</p>
            <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
            />
            <p>Wind: {weather.wind.speed} m/s</p>
        </div>
    );
}

export default Weather;