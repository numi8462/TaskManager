import React, { useEffect, useState, useRef  } from 'react';
import './header.scss';
import Logo from '../../assets/check.svg'
import { Link } from 'react-router-dom';
import { logoutSuccess } from '../../redux/authSlice';
import history from '../../history';
import { useSelector, useDispatch } from 'react-redux';
import ProfileImg from '../../assets/profile.svg';
import Profile from '../dropdown/dropdownProfile';

const Header = () => {
    const { auth } = useSelector((state) => ({...state}));
    const [logo,setLogo] = useState(null);
    const [openProfile,setOpenProfile] = useState(false);
    const profileRef = useRef(null); // Create a ref

    // This function will be called when user clicks anywhere on the page
    const handleClickOutside = (event) => {
        // Check if the user is clicking on the profile
        if (profileRef.current && !profileRef.current.contains(event.target)) {
            setOpenProfile(false);
        }
    };
    // Check if user has photoURL, if not set it to SVG file
    useEffect(() => {
        if (auth.currentUser && !auth.currentUser.photoURL) {
            setLogo(ProfileImg);
        }

        // Attach the listeners on component mount
        document.addEventListener('mousedown', handleClickOutside);

        // Detach the listeners on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [auth.currentUser]);

    return (
        <>
            <nav className="header">

                <div className="header_logo" >
                    <Link to='/'>
                        <img className='header_image' src={Logo} alt="Logo" />
                    </Link>
                    <h1>Task Manager</h1>
                </div>

                <div className="header_buttons">
                    {auth.currentUser && auth.currentUser.token ? (        
                            <div className="profile" >
                                <h3>{auth.currentUser.username}</h3>
                                <img src={logo} alt="profile" className="profile_image" onClick={() => setOpenProfile((prev) => (!prev))}/>
                            </div>
                        ) : (
                            <div className='default'>
                                <button className='login_button'>
                                    <Link to='/signin' className='login'>
                                        로그인    
                                    </Link>
                                </button>
                                {/* <button className='signup_button'> 
                                    <Link to='/signup' className=''>
                                        가입하기   
                                    </Link>
                                </button> */}
                            </div>
                        )}
                </div>
                {
                    openProfile && 
                    <div ref={profileRef}>
                        <Profile/>
                    </div>

                }
            </nav>
        </>
    )
}

export default Header;