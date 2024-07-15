import React from 'react';
import './header.scss';
import Logo from '../../assets/check.svg'

const Header = () => {
    return (
        <>
            <nav className="header">
                <div className="header_logo">
                    <img className='header_image' src={Logo} alt="Logo" />
                    <h1>Task Manager</h1>
                </div>
                <div className="header_buttons">
                    <button>Sign In</button>
                    <button>Sign Out</button>
                </div>
            </nav>
        </>
    )
}

export default Header;