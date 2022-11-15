import Card from "../UI/Card";

import Day from '../../assets/images/day.svg';
import Night from '../../assets/images/night.svg';

import classes from "./DailyWeather.module.css";

const DailyWeather = (props) => {

  const daylist = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = new Date().getDay();
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();

  const kelvinConversion = (kelvin) => {
    const celsius = Math.round(kelvin - 273.15);
    return celsius;
  };

  return (
    <>
    <Card className={classes["weather-container"]} style={{backgroundImage: props.weatherInfo.list[0].weather[0].icon.includes('d') ? `url(${Day})` : `url(${Night})`}}>
    <div className={classes['weather-container__shadow']}></div>
      <h1 className={classes["weather-city"]}>{props.weatherInfo.city.name}</h1>
      <h2 className={classes["weather-temp"]}>
        {kelvinConversion(props.weatherInfo.list[0].main.temp)}&ordm;C
      </h2>
      <span className={classes["weather-icon"]}>
        <img src={`http://openweathermap.org/img/wn/${props.weatherInfo.list[0].weather[0].icon}@2x.png`} alt='weather icon'></img>
      </span>
      <h3 className={classes["weather-conditions"]}>
        {props.weatherInfo.list[0].weather[0].main}
      </h3>
      <div className={classes["weather-date"]}>
        <span>{daylist[currentDay]}</span>
        <span className={classes["weather-date__time"]}>{currentHour + ':' + (currentMinute.toString().length > 1 ? currentMinute : '0' + currentMinute)}</span>
      </div>
      <div className={classes["weather-conditions__2"]}>
        <span>Wind: {props.weatherInfo.list[0].wind.speed} m/s</span>
        <span>Pressure: {props.weatherInfo.list[0].main.pressure} hPa</span>
      </div>
      <div className={classes["weather-conditions__3"]}>
        <span>Humidity: {props.weatherInfo.list[0].main.humidity}%</span>
        <span>Cloudiness: {props.weatherInfo.list[0].clouds.all}%</span>
      </div>
    </Card>
    </>
  );
};

export default DailyWeather;
