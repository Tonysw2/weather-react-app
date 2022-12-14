import React from 'react';
import { weather } from '../../WeatherAPI/WeatherAPI';
import style from './styles.module.css';

export const ForecastWeather = ({ forecastWeather }) => {
    return (
        <div className={style.container}>
            <div>
                <p>
                    {weather.formatWeatherDate(forecastWeather.dt, {
                        weekday: 'long',
                    })}
                </p>
                <p>
                    {weather.formatWeatherDate(forecastWeather.dt, {
                        hour: 'numeric',
                    })}
                </p>
            </div>
            <img
                src={require(`../../images/${forecastWeather.weather[
                    forecastWeather.weather.length - 1
                ].main.toLowerCase()}.png`)}
                alt={forecastWeather.weather[0].main}
            />
            <p>
                <span>{`${Math.round(forecastWeather.main.temp)}°C`}</span>
            </p>
        </div>
    );
};
