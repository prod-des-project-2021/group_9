import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import Home from './components/pages/Home'
import Recipes from './components/pages/Recipes'
import LogIn from './components/pages/LogIn'
import Navbar from './components/Navbar';
import MyRecipes from './components/pages/MyRecipes'
import Recipe from './components/pages/Recipe'
import Footer from './components/Footer';


function App() {
    return (
        <div className="flex flex-col h-screen justify-between">
            <Router>
                <Navbar />
                <div className="mb-auto justify-self-start">
                    <Routes >
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/recipes" element={<Recipes />} />
                        <Route exact path="/login" element={<LogIn />} />
                        <Route exact path="/myrecipes" element={<MyRecipes />} />
                        <Route exact path="/recipe" element={<Recipe />} />
                    </Routes>
                </div>
                <Footer/>
            </Router>
        </div>
    )
}

export default App
