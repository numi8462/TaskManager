import { useState } from 'react'
import './App.css'
import Header from './components/navigation/header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Header></Header>
      </div>
    </>
  )
}

export default App
