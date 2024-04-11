import React, { useState } from 'react'
import { FcSearch } from "react-icons/fc";
import sunicon from '../assets/sunicon.png';
import cloudicon from '../assets/cloudicon1.png';
import drizzleicon from '../assets/drizzleicon.png';
import rainicon from '../assets/rainicon.png';
import snowicon from '../assets/snowicon.png';
import windicon from '../assets/windicon.png'
import humanityicon from '../assets/Humanityicon.png'
import emptyicon from '../assets/emptyicon.png'

const WeatherDetails = ({ icon, temp, city, country, lat, log, humanity, wind }) => {
    return (
        <>
            <div className="weatherimage">
                <img src={icon} alt="Image" />
            </div>
            <div className="area" style={{ marginTop: "30px" }}>
                <h3 className='degree'>{temp}°C</h3>
                <h2 className='cityName' style={{ color: "darkblue" }}>{city}</h2>
                <h3 className='countryName'>{country}</h3>
            </div>
            <div className="lag-lon">
                <h4>latitude <br />{lat}</h4>
                <h4>longitude <br />{log}</h4>
            </div>
            <div className="footimage">
                <img src={humanityicon} alt="Image" style={{ width: '60px', height: '50px' }} />
                <img src={windicon} alt="Image" style={{ width: '60px', height: '50px' }} />
            </div>
            <div className="hum-speed">
                <h4>{humanity} % <br />Humanity</h4>
                <h4>{wind} km/h <br /> Wind speed </h4>
            </div>
        </>
    )
}

export const Weather = () => {
    const [icon, seticon] = useState(emptyicon);
    const [temp, settemp] = useState(0);
    const [city, setcity] = useState("-");
    const [country, setcountry] = useState("-");
    const [lat, setlat] = useState(0);
    const [log, setlog] = useState(0);
    const [humidity, sethumidity] = useState(0);
    const [wind, setwind] = useState(0);
    const [text, settext] = useState("");
    const [citynotfound, setcitynotfound] = useState(false);
    const [loading, setloading] = useState(false);

    const weatherIconpret = {
        "01n": sunicon,
        "02d": cloudicon,
        "03n": cloudicon,
        "03d": drizzleicon,
        "03n": drizzleicon,
        "04n": drizzleicon,
        "04d": drizzleicon,
        "09d": rainicon,
        "09n": rainicon,
        "10d": rainicon,
        "10n": rainicon,
        "13d": snowicon,
        "13n": snowicon,
    }
    const search = async () => {
        setloading(true)
        const API_KEY = "af4a4ad8b05d69e4d3532793d78c2a3a";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${API_KEY}&units=Metric`

        try {
            let result = await fetch(url)
            let data = await result.json()
            console.log(data);
            if (data.cod === "404") {
                console.log("CityNotFound");
                setcitynotfound(true)
                setloading(true)
                return;
            }
            setcity(data.name)
            setcountry(data.sys.country)
            settemp(Math.floor(data.main.temp))
            setlog(data.coord.lon)
            setlat(data.coord.lat)
            sethumidity(data.main.humidity)
            setwind(data.wind.speed)
            const weathericoncode = data.weather[0].icon
            seticon(weatherIconpret[weathericoncode] || sunicon)

            setcitynotfound(false)
        } catch (error) {
            console.log("An error occurred", error.message);
        } finally {
            setloading(false)
        }
    }
    const handleCity = (e) => {
        settext(e.target.value)
    }
    const handlekeydown = (e) => {
        if (e.key === "Enter") {
            search();
        }
    }
    return (
        <>
<h1>Weather Application</h1>
            <div className="app-container">
                <div className="input-container">
                    <input type="text" className="cityinput" placeholder='Search City-Name'
                        onChange={handleCity} onKeyDown={handlekeydown} value={text} />
                    <div className="search-icon" onClick={() => search()}>
                        <FcSearch />
                    </div>
                </div>
                {!citynotfound && !loading && <WeatherDetails icon={icon} temp={temp} city={city}
                    country={country} lat={lat} log={log} humanity={humidity} wind={wind} />}
                <div className='error'>
                    {loading && <h3>Loading....</h3>}
                    {citynotfound && <h3>CityNotFound</h3>}
                </div>
            </div>
        </>
    )
}
