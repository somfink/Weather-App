import Card from "../UI/Card";

import classes from "./NextDaysWeather.module.css";

const NextDaysWeather = (props) => {
  const kelvinConversion = (kelvin) => {
    const celsius = Math.round(kelvin - 273.15);
    return celsius;
  };

  const daylist = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = new Date(props.day * 1000).getDay();

  return (
    <Card className={classes["nextDay-weather"]}>
      <h3 className={classes["nextDay-weather__day"]}>{daylist[currentDay]}</h3>
      <span className={classes["nextDay-weather__icon"]}>
        <img
          src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`}
          alt="weather icon"
        ></img>
      </span>
      <h4 className={classes["nextDay-weather__temp"]}>
        {kelvinConversion(props.temperature)}&ordm;C
      </h4>
      <h4 className={classes["nextDay-weather__condition"]}>
        {props.condition}
      </h4>
    </Card>
  );
};

export default NextDaysWeather;
