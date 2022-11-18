import React from 'react';
import style from './styles.module.css';

export const CityWeather = ({ weatherData }) => {
    return (
        weatherData && (
            <section className={style['section-weather']}>
                <div className={style['container-weather']}>
                    <div className={style['wrap-temperature-info']}>
                        <div className={style.temp}>
                            <img
                                className={style['weather-icon']}
                                src={require(`../../images/${weatherData.weather.weather[0].main.toLowerCase()}.png`)}
                                alt={`${weatherData.weather.weather[0].main}`}
                            />
                            <div className={style['wrap-temp']}>
                                <p className={style.temperature}>
                                    {Math.round(weatherData.weather.main.temp)}
                                </p>
                                <span>°C</span>
                            </div>
                        </div>
                    </div>
                    <div className={style['weather-detail']}>
                        <p>{`Humidity: ${weatherData.weather.main.humidity}%`}</p>
                        <p>{`Wind: ${Math.round(
                            weatherData.weather.wind.speed * 3.6
                        )} Km/h`}</p>
                        <p>{`Max: ${weatherData.weather.tempMaxMin.max}°C`}</p>
                        <p>{`Min: ${weatherData.weather.tempMaxMin.min}°C`}</p>
                    </div>
                </div>
                <div className={style['general-information']}>
                    <p className={style.city}>
                        {weatherData.weather.name},
                        <span> {weatherData.weather.sys.country}</span>
                    </p>
                    <p className={style.time}>{weatherData.weather.dt}</p>
                    <p className={style.weather}>
                        {
                            weatherData.weather.weather[
                                weatherData.weather.weather.length - 1
                            ].description
                        }
                    </p>
                </div>
            </section>
        )
    );
};
