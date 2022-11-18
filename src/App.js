import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { API_WEATHER } from './API/API';
import './App.css';
import { CityWeather } from './components/CityWeather';
import { ForecastWeather } from './components/ForecastWeather';
import { Form } from './components/Form';
import { SunWeather } from './components/SunWeather';
import { weather } from './WeatherAPI/WeatherAPI';

export function App() {
    const [weatherData, setWeatherData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getTempMinMax = (data) => {
        let max = data.list[0].main.temp_max;
        let min = data.list[0].main.temp_min;
        let tempMaxMin = { max: 0, min: 0 };

        data.list.forEach((item) => {
            if (item.main.temp_max > max) {
                max = item.main.temp_max;
            } else if (item.main.texmp_min < min) {
                min = item.main.temp_min;
            }
        });

        tempMaxMin.max = Math.round(max);
        tempMaxMin.min = Math.round(min);

        return tempMaxMin;
    };

    const submitHandler = useCallback(async (city) => {
        const localWeatherData = await weather.getLocalWeatherCity(
            city,
            setError,
            setLoading
        );
        const forecastWeatherData = await weather.getForescastWeatherCity(
            city,
            setError,
            setLoading
        );

        if (
            localWeatherData.response !== undefined ||
            forecastWeatherData.response !== undefined
        ) {
            return alert(
                localWeatherData?.response.data.message ||
                    forecastWeatherData?.response.data.message
            );
        }

        setWeatherData({
            weather: {
                ...localWeatherData,
                dt: weather.formatWeatherDate(localWeatherData.dt, {
                    weekday: 'long',
                    hour: 'numeric',
                    minute: '2-digit',
                }),
                tempMaxMin: getTempMinMax(forecastWeatherData),
            },
            forecast: {
                ...forecastWeatherData,
                city: {
                    ...forecastWeatherData.city,
                    sunrise: weather.formatWeatherDate(
                        forecastWeatherData.city.sunrise,
                        { hour: 'numeric', minute: '2-digit' }
                    ),
                    sunset: weather.formatWeatherDate(
                        forecastWeatherData.city.sunset,
                        { hour: 'numeric', minute: '2-digit' }
                    ),
                },
            },
        });
        setError(false);
    }, []);

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
                    dt: weather.formatWeatherDate(localWeatherData.dt, {
                        weekday: 'long',
                        hour: 'numeric',
                        minute: '2-digit',
                    }),
                    tempMaxMin: getTempMinMax(localForescastData),
                },
                forecast: {
                    ...localForescastData,
                    city: {
                        ...localForescastData.city,
                        sunrise: weather.formatWeatherDate(
                            localForescastData.city.sunrise,
                            { hour: 'numeric', minute: '2-digit' }
                        ),
                        sunset: weather.formatWeatherDate(
                            localForescastData.city.sunset,
                            { hour: 'numeric', minute: '2-digit' }
                        ),
                    },
                },
            });
            setLoading(false);
        });
    }, []);

    return (
        <div className="app-container">
            <Form onSubmitHandler={submitHandler} error={error} />
            {loading && (
                <div className="loading">
                    <p>Loading...</p>
                </div>
            )}
            {!error && !loading && weatherData && (
                <CityWeather weatherData={weatherData} />
            )}
            {!error && !loading && weatherData && (
                <div className="card">
                    {weatherData.forecast.list.map((forecastWeather) => (
                        <ForecastWeather
                            key={forecastWeather.dt}
                            forecastWeather={forecastWeather}
                        />
                    ))}
                </div>
            )}
            {!error && !loading && weatherData && (
                <SunWeather forecast={weatherData.forecast} />
            )}
        </div>
    );
}
