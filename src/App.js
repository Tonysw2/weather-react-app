import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_WEATHER } from './API/API';
import './App.css';
import CityWeather from './components/CityWeather/CityWeather';
import { ForecastWeather } from './components/ForecastWeather/ForecastWeather';
import Form from './components/Form.js/Form';
import { weather } from './weatherAPI/weatherAPI';

export function App() {
    const [weatherData, setWeatherData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            setLoading(true);
            const responseWeatherData = await axios.get(
                `${API_WEATHER.base}weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_WEATHER.key}&units=metric`
            );
            const localWeatherData = responseWeatherData.data;
            const responseForescastData = await axios.get(
                `${API_WEATHER.base}forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_WEATHER.key}&units=metric`
            );
            const localForescastData = responseForescastData.data;
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
            <Form
                setWeatherData={setWeatherData}
                setLoading={setLoading}
                error={error}
                setError={setError}
            />
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
