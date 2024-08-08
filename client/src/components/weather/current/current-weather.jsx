import React, { useEffect, useState } from 'react';
import './current-weather.scss';

const CurrentWeather = ({data}) => {
    return (  
        <div className="current-weather">
            <div className="top">
                <img src={`./icons/${data.weather[0].icon}.png`} alt="weather" className="weather-icon" />
                <div className='top__info'>
                    <span className="description">{data.weather[0].main}</span>
                    <p className="temp">{Math.round(data.main.temp)}°C</p>
                    <span className="city">{data.name}</span>
                </div>

            </div>
            <div className="bottom">
                <div className="details">
                    <div className="parameter-row">
                        <span className="parameter-label">최고온도 </span>
                        <span className="parameter-value">{Math.round(data.main.temp_max)}°C</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">풍속 </span>
                        <span className="parameter-value">{data.wind.speed}</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">습도 </span>
                        <span className="parameter-value">{data.main.humidity}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default CurrentWeather;