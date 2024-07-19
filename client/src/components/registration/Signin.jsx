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
		dispatch(
			signin({
				email: state.email,
				password: state.password,
			})
		);
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
                            <Link to='/signup'><p>새로 가입하기</p></Link>
                            <p>비밀번호를 잊으셨나요? 비밀번호찾기</p>
                        </div>
                    </form>
                    
                </div>
            </div>
        </> 
    );
}
 
export default Signin;