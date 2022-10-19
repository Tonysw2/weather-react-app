import React, { useRef, useState } from 'react';
import { weather } from '../../WeatherAPI/WeatherAPI';
import style from './Form.module.css';

const Form = ({ setWeatherData, setLoading, loading }) => {
    const [focused, setFocused] = useState(false);
    const inputSearch = useRef(null);

    const focusHandler = () => {
        setFocused((prev) => {
            if (prev === false) {
                return !prev;
            } else {
                return !prev;
            }
        });
    };

    const onSubmitHandler = async (city) => {
        try {
            setLoading(true);

            const weatherData = await weather.getLocalWeatherCity(city);
            const forecastWeather = await weather.getForescastWeatherCity(city);
            setWeatherData({
                weather: {
                    ...weatherData,
                    dt: weather.formatWeatherDate(weatherData),
                },
                forecast: forecastWeather,
            });
            setLoading(false);
        } catch (error) {
            alert(error);
        }
    };

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                onSubmitHandler(inputSearch.current.value);
                inputSearch.current.value = '';
            }}
            className={focused ? `${style.form} ${style.focused}` : style.form}
        >
            <input
                ref={inputSearch}
                className={style.search}
                type="text"
                placeholder="Search for a city"
                onFocus={focusHandler}
                onBlur={focusHandler}
            />
        </form>
    );
};

export default Form;
