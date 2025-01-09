
import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Homepage } from './Homepage';
import Navbar from './Navbar';
import { AboutPage } from './AboutPage';
function App() {

  return (
    <>
       <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
      </>
  )
}

export default App
