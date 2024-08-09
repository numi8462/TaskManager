import React, { useEffect, useState, useRef } from 'react';
import './header.scss';
import Logo from '../../assets/check.svg'
import { Link } from 'react-router-dom';
import { logoutSuccess } from '../../redux/authSlice';
import history from '../../history';
import { useSelector, useDispatch } from 'react-redux';
import ProfileImg from '../../assets/profile.svg';
import Profile from '../dropdown/dropdownProfile';
import { FaBars } from "react-icons/fa6";
import Sidebar from '../sidebar/Sidebar';

const Header = () => {
    const auth = useSelector((state) => state.auth);
    const [profileImage, setProfileImage] = useState(null);
    const [openProfile, setOpenProfile] = useState(false);
    const profileRef = useRef(null); // Create a ref
    const [showSidebar, setShowSidebar] = useState(false);


    // This function will be called when user clicks anywhere on the page
    const handleClickOutside = (event) => {
        // Check if the user is clicking on the profile
        if (profileRef.current && !profileRef.current.contains(event.target)) {
            setOpenProfile(false);
        }
    };
    // Check if user has photo, if not set it to SVG file
    useEffect(() => {
        if (auth.currentUser) {
          if (!auth.currentUser.photo) {
            setProfileImage(ProfileImg);
          } else {
            setProfileImage(`./images/${auth.currentUser.photo}`);
          }
        } else {
          setProfileImage(ProfileImg); // Set a default image if currentUser is null
        }
    }, [auth.currentUser]);

    return (
        <>
            <nav className="header">
                <Sidebar show={showSidebar} />
                <div className="header_bar" onClick={() => setShowSidebar(!showSidebar)}>
                    <FaBars />

                </div>

                <div className="header_logo" >
                    <Link to='/'>
                        <img className='header_image' src={Logo} alt="Logo" />
                    </Link>
                    <h1>Task Manager</h1>
                </div>

                <div className="header_buttons">
                    {auth.currentUser && auth.currentUser.token ? (
                        <div className="profile" onClick={() => setOpenProfile((prev) => (!prev))}>
                            <img src={profileImage} alt="profile" className="profile_image" />
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
                        <Profile />
                    </div>

                }
            </nav>
        </>
    )
}

export default Header;