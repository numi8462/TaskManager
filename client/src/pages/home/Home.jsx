import { useState } from 'react';
import './home.scss';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const Home = () => {
    const { auth } = useSelector((state) => ({...state}));
    const { currentUser } = auth;
    return (
        <>
            <div className='home'>
                <div className="home__container">
                    <h1>쉽게 하루 일정 다 정리하기</h1>
                    <p>With TaskManager</p>

                    { currentUser && currentUser.token ? (
                        <Link to='/dashborad'>
                            <button className="start-button"><h2>시작하기</h2></button>
                        </Link>
                    ) : (
                        <Link to='/signin'>
                            <button className="start-button"><h2>시작하기</h2></button>
                        </Link>
                    )}

                    
                </div>  
            </div>
        </>
    );
}
 
export default Home;