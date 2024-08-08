import { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import './dashboard.scss';
import '../../styles/components/_button.scss';
import Search from '../../components/weather/search/search';
import CurrentWeather from '../../components/weather/current/current-weather';
import { WEATHER_API_KEY, WEATHER_API__URL } from '../../components/weather/geoAPI';
import Forecast from '../../components/forecast/forecast';

const Dashboard = () => {
    const [ currentWeather, setCurrentWeather ] = useState(null);
    const [ currentForecast, setCurrentForecast ] = useState(null);

    const fetchWeatherData = async (lat, lon, city) => {
        const currentWeatherFetch = fetch(`${WEATHER_API__URL}/weather?lat=${lat}&lon=${lon}&exclude={part}&appid=${WEATHER_API_KEY}&units=metric`);
        const currentForecastFetch = fetch(`${WEATHER_API__URL}/forecast?lat=${lat}&lon=${lon}&exclude={part}&appid=${WEATHER_API_KEY}&units=metric`);
    
        Promise.all([currentWeatherFetch, currentForecastFetch])
            .then(async (response) => {
                const weatherResponse = await response[0].json();
                const forecastResponse = await response[1].json();
                setCurrentWeather({ city: city , ...weatherResponse});
                setCurrentForecast({ city: city , ...forecastResponse});
            }).catch((err) => console.log(err));
    }
    
    const handleOnSearchChange = (searchData) => {
        const [lat, lon] = searchData.value.split(" ");
        fetchWeatherData(lat, lon, searchData.label);
        
    }
    
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const currentLat = position.coords.latitude;
                const currentLon = position.coords.longitude;
                fetchWeatherData(currentLat, currentLon);
            }, (error) => {
                console.log(error);
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);
    

    return ( <>
        <div className="dashboard">
            <div className="dashboard__right">
                <div className="dashboard__right__content">
                    <Search onSearchChange={handleOnSearchChange}/>
                    { currentWeather && <CurrentWeather data={currentWeather}/>}
                    { currentForecast && <Forecast data={currentForecast}/>}
                </div>
            </div>
        </div>
    </> );
}
  
 export default Dashboard;