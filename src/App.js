import { useEffect, useState } from 'react';
import './App.css';
import CityWeather from './components/CityWeather/CityWeather';
import { ForecastWeather } from './components/ForecastWeather/ForecastWeather';
import Form from './components/Form.js/Form';
import { weather } from './WeatherAPI/WeatherAPI';

export function App() {
    const [weatherData, setWeatherData] = useState(false);
    const [loading, setLoading] = useState(false);
    console.log(weatherData.forecast);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            setLoading(true);
            const localWeatherData = await weather.getLocalWeatherCoords({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
            });
            const localForescastData = await weather.getForescastWeatherCoords({
                lat: position.coords.latitude,
                lon: position.coords.longit,
            });
            setWeatherData({
                weather: {
                    ...localWeatherData,
                    dt: weather.formatWeatherDate(localWeatherData, {
                        weekday: 'long',
                        hour: 'numeric',
                        minute: '2-digit',
                    }),
                },
                forecast: localForescastData,
            });
            setLoading(false);
        });
    }, []);

    return (
        <div className="app-container">
            <Form setWeatherData={setWeatherData} setLoading={setLoading} />
            {loading && <p>Loading...</p>}
            {!loading && <CityWeather weatherData={weatherData} />}
            {!loading && weatherData && (
                <div className="card">
                    {weatherData.forecast.list.map((forecastWeather) => (
                        <ForecastWeather
                            key={forecastWeather.dt}
                            forecastWeather={forecastWeather}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}


