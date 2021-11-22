import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import Home from './components/pages/Home'
import Recipes from './components/pages/Recipes'
import LogIn from './components/pages/LogIn'
import Navbar from './components/Navbar';
import MyRecipes from './components/pages/MyRecipes'
import Slideshow from './components/Slideshow';

function App() {

    const padding = {
        padding: 5
    }
    
    return (
        <Router>         
            <Navbar />
                &nbsp; 
                <Slideshow />
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/recipes" element={<Recipes />} />
                        <Route exact path="/login" element={<LogIn />} />
                        <Route exact path="/myrecipes" element={<MyRecipes />} />
                    </Routes>
        </Router>
    )
}

export default App
