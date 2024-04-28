import { useEffect, useState } from 'react';

import DailyWeather from '../DailyWeather/DailyWeather';
import NextDaysWeather from '../NextDaysWeather/NextDaysWeather';
import SearchBar from '../SearchBar/SearchBar';

import classes from './LandingPage.module.css';

const LandingPage = () => {
    const [responseData, setResponseData] = useState(null);
    const [isSearched, setIsSearched] = useState(false);
    const [nextDaysWeatherData, setNextDaysWeatherData] = useState(null);

    useEffect(() => {
        const getNextDayWeather = weatherData => {
            const currentDate = new Date(weatherData.list[0].dt * 1000);

            const nextFourDaysWeather = weatherData.list.filter(data => {
                if (
                    (new Date(data.dt * 1000) - currentDate) /
                        (1000 * 60 * 60) ===
                    24
                ) {
                    return { ...data, id: Math.random() };
                }
                if (
                    (new Date(data.dt * 1000) - currentDate) /
                        (1000 * 60 * 60) ===
                    48
                ) {
                    return { ...data, id: Math.random() };
                }
                if (
                    (new Date(data.dt * 1000) - currentDate) /
                        (1000 * 60 * 60) ===
                    72
                ) {
                    return { ...data, id: Math.random() };
                }
                if (
                    (new Date(data.dt * 1000) - currentDate) /
                        (1000 * 60 * 60) ===
                    96
                ) {
                    return { ...data, id: Math.random() };
                }
                return null;
            });

            setNextDaysWeatherData(nextFourDaysWeather);
            console.log(nextDaysWeatherData);
        };

        if (responseData) {
            getNextDayWeather(responseData);
            console.log(responseData);
        }
    }, [responseData, nextDaysWeatherData]);

    const getResponseData = data => {
        setResponseData(data);
        setIsSearched(true);
    };

    const returnContent = () => {
        if (isSearched && nextDaysWeatherData) {
            return (
                <>
                    <DailyWeather weatherInfo={responseData} />
                    <section className={classes['nextDays-weather']}>
                        {nextDaysWeatherData.map(nextDayData => (
                            <NextDaysWeather
                                day={nextDayData.dt}
                                icon={nextDayData.weather[0].icon}
                                temperature={nextDayData.main.temp}
                                condition={nextDayData.weather[0].main}
                                key={nextDayData.id}
                            />
                        ))}
                    </section>
                </>
            );
        }
        return (
            <h2 className={classes['weather-heading']}>
                Please write a city name to search current weather
            </h2>
        );
    };

    return (
        <header className={classes.header}>
            <div
                className={classes['weather-container']}
                style={{
                    justifyContent: !isSearched ? 'center' : 'space-around',
                }}
            >
                <SearchBar onResponse={getResponseData} />
                {returnContent()}
            </div>
        </header>
    );
};

export default LandingPage;
