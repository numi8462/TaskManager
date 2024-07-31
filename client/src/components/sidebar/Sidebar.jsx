import './Sidebar.scss'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import home from '../../assets/home.svg';
import settings from '../../assets/settings.svg';
import { FaCalendar } from "react-icons/fa";
import { MdOutlineCheckBox } from "react-icons/md";

const Sidebar = () => {
    const { auth } = useSelector((state) => ({...state}));
    const { currentUser } = auth;

    return ( 
        <>
            <div className="sidebar">
                <ul className='sidebar_list'>
                    <Link to='/dashboard' className='sidebar__link'>
                        <li className='list-item'>
                            <img src={home} alt="" className='sidebar__icon'/>
                            Home
                        </li>
                    </Link>
                    <Link to='/taskmanager' className='sidebar__link'>
                        <li className='list-item'>
                            <MdOutlineCheckBox className='sidebar__icon'/>
                            TODO
                        </li>
                    </Link>
                    <Link to='/calendar' className='sidebar__link'>
                        <li className='list-item'>
                            <FaCalendar className='sidebar__icon'/>
                            Calendar
                        </li>
                    </Link>
                    <Link to='/settings' className='sidebar__link'>
                        <li className='list-item'>
                            <img src={settings} alt="" className='sidebar__icon'/>
                            Settings
                        </li>
                    </Link>
                </ul>

            </div>
        </>
     );
}
 
export default Sidebar;
