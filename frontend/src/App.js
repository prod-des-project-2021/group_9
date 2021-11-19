import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import Home from './components/pages/Home'
import Recipes from './components/pages/Recipes'
import LogIn from './components/pages/LogIn'
import Navbar from './components/Navbar';

function App() {

    const padding = {
        padding: 5
    }
    
    return (
        <Router>
            <Navbar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/recipes" element={<Recipes />} />
                    <Route exact path="/login" element={<LogIn />} />
                </Routes>
        </Router>
    )
}

export default App
