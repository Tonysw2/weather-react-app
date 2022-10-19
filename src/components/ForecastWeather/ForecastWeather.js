import { Sun } from 'phosphor-react';
import React from 'react';
import { weather } from '../../WeatherAPI/WeatherAPI';
import style from './ForecastWeather.module.css';

export const ForecastWeather = ({ forecastWeather }) => {
    return (
        <div className={style.container}>
            <p>
                {weather.formatWeatherDate(forecastWeather, {
                    weekday: 'long',
                    hour: 'numeric',
                })}
            </p>
            <Sun size={60} />
            <p>
                <span>{`${Math.round(forecastWeather.main.temp)}°C`}</span>
            </p>
        </div>
    );
};
