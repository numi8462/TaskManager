import { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/navigation/header';
import Signup from './components/registration/Signup';
import Signin from './components/registration/Signin';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/dashboard';
import TaskManager from './pages/taskmanagement/TaskManager';
import Calendar from './pages/calendar/Calendar';
import Settings from './pages/settings/Settings';
import DragDropTask from './pages/dragdropTask/dragdropTask';
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <div className='main'>
        <Router>
          <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/taskmanager' element={<TaskManager/>}/>
            <Route path='/calendar' element={<Calendar/>}/>
            <Route path='/settings' element={<Settings/>}/>
            <Route path='/dragdroptask' element={<DragDropTask/>}/>
          </Routes>
        </Router>

      </div>
    </>
  )
}

export default App
