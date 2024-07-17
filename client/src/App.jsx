import { useState } from 'react'
import './App.css'
import Header from './components/navigation/header'
import Signup from './components/registration/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Header/>
        <Signup/>
      </div>
    </>
  )
}

export default App
