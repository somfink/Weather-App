import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { HiSearch } from 'react-icons/hi';
import classes from './SearchBar.module.css';

const SearchBar = ({ onResponse }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [searchCity, setSearchCity] = useState('');

    const urlGeo = `https://api.openweathermap.org/geo/1.0/direct?q=${searchCity.toLowerCase()}&limit=5&appid=c827f74af21b6456d3f8749778cc13f5`;

    useEffect(() => {
        if (weatherData) {
            console.log(weatherData);
            onResponse(weatherData);
        }
    }, [weatherData, onResponse]);

    const getWeatherInfo = (lat, lon) => {
        const urlWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=c827f74af21b6456d3f8749778cc13f5`;
        axios
            .get(urlWeather)
            .then(response => {
                setWeatherData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const searchLocationHandler = e => {
        e.preventDefault();

        axios
            .get(urlGeo)
            .then(response => {
                getWeatherInfo(response.data[0].lat, response.data[0].lon);
            })
            .catch(error => {
                console.log(error);
            });

        setSearchCity('');
    };

    const searchCityInput = e => {
        setSearchCity(e.target.value);
    };

    return (
        <form
            className={classes['search-bar__container']}
            onSubmit={searchLocationHandler}
        >
            <input
                type="text"
                placeholder="Search for a city..."
                onChange={searchCityInput}
            />
            <button type="submit" className={classes['search-bar__button']}>
                <HiSearch className={classes['search-bar__searchIcon']} />
            </button>
        </form>
    );
};

export default SearchBar;
