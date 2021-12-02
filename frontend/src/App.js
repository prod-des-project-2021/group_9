import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import Home from './components/pages/Home'
import Recipes from './components/pages/Recipes'
import LogIn from './components/LogIn'
import Navbar from './components/Navbar';
import MyRecipes from './components/pages/MyRecipes'
import Footer from './components/Footer';

function App() {

    const padding = {
        padding: 5
    }

    return (
        <Router>         
            <LogIn />

            <Navbar />
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/recipes" element={<Recipes />} />
                        <Route exact path="/myrecipes" element={<MyRecipes />} />
                    </Routes>
        </Router>
    )
}

export default App
