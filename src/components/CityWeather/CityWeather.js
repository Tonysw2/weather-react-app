import { Cloud } from 'phosphor-react';
import React from 'react';
import style from './CityWeather.module.css';

const CityWeather = ({ weatherData }) => {
    return (
        weatherData && (
            <section className={style['section-weather']}>
                <div className={style['container-weather']}>
                    <div className={style['wrap-temperature']}>
                        <Cloud color="#e9ecef" size={60} />
                        <div className={style.temp}>
                            <p className={style.temperature}>
                                {Math.round(weatherData.weather.main.temp)}
                            </p>
                            <span>°C</span>
                        </div>
                    </div>
                    <div className={style['weather-detail']}>
                        <p>{`Humidity: ${weatherData.weather.main.humidity}%`}</p>
                        <p>{`Wind: ${Math.round(
                            weatherData.weather.wind.speed * 3.6
                        )} Km/h`}</p>
                    </div>
                </div>
                <div className={style['general-information']}>
                    <p className={style.city}>{weatherData.weather.name}</p>
                    <p className={style.time}>{weatherData.weather.dt}</p>
                    <p className={style.weather}>
                        {weatherData.weather.weather[0].description}
                    </p>
                </div>
            </section>
        )
    );
};

export default CityWeather;
