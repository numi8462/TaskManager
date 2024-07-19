import { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/navigation/header';
import Signup from './components/registration/Signup';
import Signin from './components/registration/Signin';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/dashboard';
import './App.css'

import {store} from './redux/store';
import { Provider } from 'react-redux';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Router>
          <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
          </Routes>
        </Router>

      </div>
    </>
  )
}

export default App
