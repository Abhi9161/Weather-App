import React, { useState, useEffect } from "react";
const api = {
  key: "b0d6e016298936c5d9e79cc90049fc49",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("delhi");
  const [weather, setWeather] = useState({});
  const [time, setTime] = useState(null);
  useEffect(() => {
    setQuery("delhi");
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery("");
        let currentTime = new Date();
        // console.log(currentTime);
        setTime(currentTime.getHours());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const search = async (evt) => {
    if (evt.key === "Enter") {
      fetchData();
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    // let time= d.getHour();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? time >= 19
            ? "app night"
            : time >= 16
            ? "app even"
            : time >= 12
            ? "app after"
            : time >= 5
            ? "app morn"
            : "app night"
          : "app night"
      }>
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='Search...'
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className='location-box'>
              <div className='location'>
                {weather.name}, {weather.sys.country}
              </div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>{Math.round(weather.main.temp)}°c</div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
