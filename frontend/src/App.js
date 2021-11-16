import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import React from 'react'
import Home from './components/pages/Home'
import Recipes from './components/pages/Recipes'

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
            </div>

            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/recipes" element={<Recipes />} />
            </Routes>

        </Router>
    )
}

export default App
