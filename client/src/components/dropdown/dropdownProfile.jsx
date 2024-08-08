import './dropdownProfile.scss';
import { logoutSuccess } from '../../redux/authSlice';
import history from '../../history';
import { Link } from 'react-router-dom';
import ProfileIcon from '../../assets/dropdownprofile.svg';
import SettingIcon from '../../assets/dropdownsetting.svg';
import LogoutIcon from '../../assets/dropdownlogout.svg';
import { useDispatch } from 'react-redux';

const DropDownProfile = () => {
    const dispatch = useDispatch();

    const handleLogout = (e) => {
        console.log("Logout")
        e.preventDefault();
		dispatch(logoutSuccess());
		localStorage.removeItem('auth');
		history.push('/signin');
		window.location.reload();
    };

    return ( 
        <div className="dropdownprofile">
            <ul className='dropdown_list'>                    
                <Link to='/settings' className=''>
                    <li>
                        <img src={ProfileIcon} alt="" className='dropdownprofile__icon__profile'/>
                        프로필
                    </li>
                </Link>
                <Link to='/settings' className=''>
                    <li>
                        <img src={SettingIcon} alt="" className='dropdownprofile__icon__setting'/>
                        설정
                    </li>
                </Link>
                <Link>
                    <li onClick={handleLogout}>
                        <img src={LogoutIcon} alt="" className='dropdownprofile__icon__logout'/>
                        로그아웃
                    </li>
                </Link>

            </ul>
        </div>
    );
}
 
export default DropDownProfile;