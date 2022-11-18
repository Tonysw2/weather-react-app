import style from './styles.module.css';

export const SunWeather = ({ forecast }) => {
    return (
        <div className={style.container}>
            <div className={style['wrap-content']}>
                <img
                    className={style.sunrise}
                    src={require('../../images/sunrise.png')}
                    alt="Sunrise"
                />{' '}
                <p>{`Sunrise - ${forecast.city.sunset}`}</p>
            </div>
            <div className={style['wrap-content']}>
                <img
                    className={style.sunset}
                    src={require('../../images/sunset.png')}
                    alt="Sunset"
                />
                <p>{`Sunset - ${forecast.city.sunset}`}</p>
            </div>
        </div>
    );
};
