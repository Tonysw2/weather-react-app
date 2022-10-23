import React, { useRef, useState } from 'react';
import { weather } from '../../weatherAPI/weatherAPI';
import style from './Form.module.css';

const Form = ({ setWeatherData, error, setError }) => {
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
        const localWeatherData = await weather.getLocalWeatherCity(
            city,
            setError
        );
        const forecastWeatherData = await weather.getForescastWeatherCity(
            city,
            setError
        );
        console.log(localWeatherData, forecastWeatherData);

        setWeatherData({
            weather: {
                ...localWeatherData,
                dt: weather.formatWeatherDate(localWeatherData, {
                    weekday: 'long',
                    hour: 'numeric',
                    minute: '2-digit',
                }),
            },
            forecast: forecastWeatherData,
        });
    };

    return (
        <div className={style['container-form']}>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    onSubmitHandler(inputSearch.current.value);
                    inputSearch.current.value = '';
                    inputSearch.current.blur();
                }}
                className={
                    focused ? `${style.form} ${style.focused}` : style.form
                }
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
            {error && (
                <div className={style.error}>
                    <p>{`${error.response.data.message
                        .slice(0, 1)
                        .toUpperCase()}${error.response.data.message.slice(
                        1,
                        error.response.data.message.length
                    )}, type city name again!`}</p>
                </div>
            )}
        </div>
    );
};

export default Form;
