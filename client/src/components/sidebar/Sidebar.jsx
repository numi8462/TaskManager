import './Sidebar.scss'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import home from '../../assets/home.svg';
import settings from '../../assets/settings.svg';
import { FaCalendar } from "react-icons/fa";
import { MdOutlineCheckBox } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import { TiWeatherCloudy } from "react-icons/ti";

const Sidebar = ({show}) => {
    const auth = useSelector((state) => state.auth);
    const { currentUser } = auth;

    return ( 
        <>
            <div className={show ? "sidebar active" : 'sidebar'}>
                <ul className='sidebar_list'>
                    {
                        currentUser ? (
                            <div>
                                <Link to='/taskmanager' className='sidebar__link'>
                                    <li className='list-item'>
                                        <MdOutlineCheckBox className='sidebar__icon'/>
                                        TODO
                                    </li>
                                </Link>

                                <Link to='/dragdropTask' className='sidebar__link'>
                                    <li className='list-item'>
                                        <FaListUl className='sidebar__icon'/>
                                        계획표
                                    </li>
                                </Link>
                                <Link to='/dashboard' className='sidebar__link'>
                                    <li className='list-item'>
                                        <TiWeatherCloudy className='sidebar__icon'/>
                                        날씨
                                    </li>
                                </Link>
                                <Link to='/calendar' className='sidebar__link'>
                                    <li className='list-item'>
                                        <FaCalendar className='sidebar__icon'/>
                                        달력
                                    </li>
                                </Link>
                                <Link to='/settings' className='sidebar__link'>
                                    <li className='list-item'>
                                        <img src={settings} alt="" className='sidebar__icon'/>
                                        설정
                                    </li>
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <Link to='/signin' className='sidebar__link'>
                                    <li className='list-item'>
                                        <MdOutlineCheckBox className='sidebar__icon'/>
                                        TODO
                                    </li>
                                </Link>
                                <Link to='/signin' className='sidebar__link'>
                                    <li className='list-item'>
                                        <FaListUl className='sidebar__icon'/>
                                        계획표
                                    </li>
                                </Link>
                                <Link to='/signin' className='sidebar__link'>
                                    <li className='list-item'>
                                        <TiWeatherCloudy className='sidebar__icon'/>
                                        날씨
                                    </li>
                                </Link>
                                <Link to='/signin' className='sidebar__link'>
                                    <li className='list-item'>
                                        <FaCalendar className='sidebar__icon'/>
                                        달력
                                    </li>
                                </Link>
                                <Link to='/signin' className='sidebar__link'>
                                    <li className='list-item'>
                                        <img src={settings} alt="" className='sidebar__icon'/>
                                        설정
                                    </li>
                                </Link>
                            </div>
                        )
                    }
                    
                </ul>

            </div>
        </>
     );
}
 
export default Sidebar;
