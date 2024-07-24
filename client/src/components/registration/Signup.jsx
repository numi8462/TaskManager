import './registration.scss'
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/authSlice';
import { Link } from 'react-router-dom'

const Singup = () => {

    const dispatch = useDispatch();

    const [state, setState] = useState({
        email:'',
        password:'',
        username:'',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // updates state
        dispatch(
            register({
                username: state.username,
                password: state.password,
                email: state.email,
            })
        )
    };

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    };

    return ( 
        <>
            <div className="signup-form">
                <div className="signup-form_wrapper">
                    <form action="" className='form' onSubmit={handleSubmit}>
                        <h1 className='register'>Register</h1>
                        <br />
                        <div className="form-group">
                            <input 
                                type="text" 
                                placeholder="이름"
                                name='username'
                                value={state.username}
                                onChange={handleChange}
                            />
                            <input 
                                type="email" 
                                name="email" 
                                id="" 
                                placeholder="이메일"
                                value={state.email}
                                onChange={handleChange}
                            />
                            <input 
                                type="password" 
                                name="password" 
                                id="" 
                                placeholder="비밀번호"
                                value={state.password}
                                onChange={handleChange}
                            />
                            <button className='button'>가입하기</button>
                            <p>이미 계정이 있나요? <Link to='/signin'>로그인</Link> 하기</p>
                            
                        </div>
                    </form>
                    
                </div>
            </div>
        </> 
    );
}
 
export default Singup;