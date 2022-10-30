import axios from 'axios';
import { API_WEATHER } from '../API/API';

// *** LOCAL ***
// weather?q=${''}&units=metric&APPID=${API_WEATHER.key}

// *** DETAIL WEATHER ***
// weather?lat=${geolocation.lat}&lon=${geolocation.lon}&appid=${API_WEATHER.key}

// *** FORECAST 5 DAYS WEATHER ***
// forecast?lat={lat}&lon={lon}&appid={API_WEATHER.key}

export const weather = {
    getLocalWeatherCity: async (city, setError, setLoading) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${API_WEATHER.base}weather?q=${city}&appid=${API_WEATHER.key}&units=metric`
            );
            const data = response.data;
            setLoading(false);
            return data;
        } catch (error) {
            setError(error);
            setLoading(false);
            return error;
        }
    },
    getForescastWeatherCity: async (city, setError, setLoading) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${API_WEATHER.base}forecast?q=${city}&appid=${API_WEATHER.key}&units=metric`
            );
            const data = response.data;
            setLoading(false);
            return data;
        } catch (error) {
            setError(error);
            setLoading(false);
            return error;
        }
    },
    formatWeatherDate: (weatherDate, options) => {
        const dateStr = String(weatherDate).padEnd(
            String(weatherDate).length + 3,
            '0'
        );
        const date = new Date(Number(dateStr));
        const newDate = date.toLocaleString('en-us', { ...options });

        return newDate;
    },
};
