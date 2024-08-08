import './forecast.scss';
import { Accordion, AccordionItemHeading, AccordionItem, AccordionItemPanel, AccordionItemButton } from 'react-accessible-accordion';

const Forecast = ({data}) => {
    console.log(data);

    const WEEK_DAYS = ['월요일','화요일','수요일','목요일','금요일','토요일','일요일'];
    const dayInWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInWeek, WEEK_DAYS.length).concat(
        WEEK_DAYS.slice(0, dayInWeek)
    );

    console.log(forecastDays);
    return (  
        <div className="forecast">
            <div className='forecast_list'>
                {data.list.splice(0, 7).map((item, idx) => (
                    <div key={idx} className="daily_item">
                        <label className="day">{forecastDays[idx]}</label>
                        <img src={`./icons/${data.list[idx].weather[0].icon}.png`} alt="weather" className="weather-icon" />
                        <label className="temp">{Math.round(item.main.temp)}°C</label>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default Forecast;