import './registration.scss'
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signin } from '../../redux/authSlice';
import { Link } from 'react-router-dom'

const Signin = () => {
	const dispatch = useDispatch();

	const [state, setState] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
        // use dispatch to login
		dispatch(
			signin({
				email: state.email,
				password: state.password,
			})
		).then(response => {
			if (!response.success) {
				alert("Incorrect password!");
			}
        });
	};

    return ( 
        <>
            <div className="signup-form">
                <div className="signup-form_wrapper">
                    <form action="submit" className='form' onSubmit={handleSubmit}> 
                        <h1 className='register'>Log In</h1>
                        <br />
                        <div className="form-group">
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
                            <button className='button'>로그인</button>
                            <p>처음 오셨나요? <Link to='/signup'>새로 가입하기</Link></p>
                            <p>로그인 하는데 조금 걸릴수있어요!</p>
                        </div>
                    </form>
                    
                </div>
            </div>
        </> 
    );
}
 
export default Signin;