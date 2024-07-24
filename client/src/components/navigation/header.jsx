import React from 'react';
import './header.scss';
import Logo from '../../assets/check.svg'
import { Link } from 'react-router-dom';
import { logoutSuccess } from '../../redux/authSlice';
import history from '../../history';
import { useSelector, useDispatch } from 'react-redux';

const Header = () => {
    const dispatch = useDispatch();
    const { auth } = useSelector((state) => ({...state}));

    const handleLogout = (e) => {
        e.preventDefault();
		dispatch(logoutSuccess());
		localStorage.removeItem('auth');
		history.push('/signin');
		window.location.reload();
    };

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
                            <Link to='/signin' className='' onClick={handleLogout}>
                                <button className='logout_button'>로그아웃</button>
                            </Link>
                        ) : (
                            <>
                                <Link to='/signin' className=''>
                                    <button className='login_button'>로그인</button>
                                </Link>

                                <Link to='/signup' className=''>
                                    <button className='signup_button'>가입하기</button>
                                </Link>
                            </>
                        )}
                </div>
            </nav>
        </>
    )
}

export default Header;