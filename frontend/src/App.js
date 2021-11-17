import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import React from 'react'
import Home from './components/pages/Home'
import Recipes from './components/pages/Recipes'
import MyRecipes from './components/pages/MyRecipes'

function App() {

    const padding = {
        padding: 5
    }
    return (
        <Router>
            {/* simple navbar for multiple pages for now... */}
            <div>
                <Link style={padding} to="/">home</Link>
                <Link style={padding} to="/recipes">recipes</Link>
                <Link style={padding} to="/myrecipes">my recipes</Link>
            </div>

            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/recipes" element={<Recipes />} />
                <Route exact path="/myrecipes" element={<MyRecipes />} />
            </Routes>

        </Router>
    )
}

export default App
