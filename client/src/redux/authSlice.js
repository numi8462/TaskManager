import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import history from '../history';
import { toast } from 'react-toastify';

// controls the application's authentication
const initialUser = localStorage.getItem('auth')
	? JSON.parse(localStorage.getItem('auth'))
	: null;

const initialState = {
	isLoading: false,
	currentUser: initialUser,
	error: null,
};
export const authSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.isLoading = false;
		},
		loginFailure: (state, action) => {
			state.error = action.payload;
		},
		registerSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.isLoading = false;
		},
		registerFailure: (state, action) => {
			state.error = action.payload;
		},
		logoutSuccess: (state) => {
			state.currentUser = null;
		},
	},
});

export const {
	loginFailure,
	loginSuccess,
	registerFailure,
	registerSuccess,
	logoutSuccess,
} = authSlice.actions;

export default authSlice.reducer;

export const register = (user) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'content-type': 'application/json',
			},
		};

		const response = await axios.post(
			'http://localhost:4000/auth/register',
			user,
			config
		);

		if (response) {
			dispatch(registerSuccess(response.data));
			toast.success('register successfull');
			history.push('/signin');
			window.location.reload();	
		} else {
			dispatch(registerFailure());
			toast.error('registration failed');
		}
	} catch (error) {
		console.log(error);
		dispatch(registerFailure());
	}
};

export const signin = (user) => async (dispatch) => {
	console.log(user);
	try {
		const userData = {
			email: user.email,
			password: user.password,
		};
		// receive response from server using authRoutes
		// authRoutes will use controller for getting response
		const response = await axios.post(
			'http://localhost:4000/auth/signin',
			userData
		);
		// if signin set auth token
		if (response) {
			localStorage.setItem('auth', JSON.stringify(response.data));
			// set state
			dispatch(loginSuccess(response.data));
			// push url to dashboard
			history.push('/dashboard');
			toast.success('login successfull');
			window.location.reload();
		} else {
			dispatch(loginFailure());
			toast.error('login failed');
		}
	} catch (error) {
		dispatch(loginFailure());
	}
};

export const uploadProfilePic = (userId, imageFile) => async (dispatch) => {
    try {
        const formData = new FormData();
        formData.append('image', imageFile);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };

        const response = await axios.post(
            `http://localhost:4000/auth/uploadProfilePic/${userId}`,
            formData,
            config
        );

        if (response) {
			// Retrieve the current auth object from local storage
			let auth = localStorage.getItem('auth');

			// Parse it into a JavaScript object
			auth = JSON.parse(auth);

			// Update the photo property
			auth.photo = response.data.photo; // Replace 'newPhoto.jpg' with the actual filename or URL

			// Stringify the updated object back into a JSON string
			const updatedAuth = JSON.stringify(auth);

			// Store the updated JSON string back into local storage
			localStorage.setItem('auth', updatedAuth);
            toast.success('Profile picture uploaded successfully');
			window.location.reload();
        } else {
            toast.error('Profile picture upload failed');
        }
    } catch (error) {
        console.log(error);
    }
};
  
