import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React, { useState } from 'react'
import Home from './components/pages/Home'
import Recipes from './components/pages/Recipes'
import LogIn from './components/LogIn'
import Navbar from './components/Navbar';
import MyRecipes from './components/pages/MyRecipes'
import Footer from './components/Footer';
import { Provider, useSelector, useDispatch } from 'react-redux'
import store from './redux/store'
import { logout } from './redux/actions/auth'
import Button from './components/Button'

function App() {

    const { isLoggedIn } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [renderLogin, setRenderLogin] = useState(false)
    const [showShoppingList, setShowShoppingList] = useState(false);

    const handleLogout = () => {
        handleRemoveWindow()
        dispatch(logout())
    }
    const handleRemoveWindow = () => {
        setRenderLogin(false)
    }
    const handleAddWindow = () => {
        setRenderLogin(true)
    }


    //navigate to shopping list is Slnavigate
    return (
        <Router>
            {!isLoggedIn && renderLogin && <LogIn dismiss={handleRemoveWindow} />}
            <Navbar handleLogout={handleLogout} isLoggedIn={isLoggedIn} mountLogin={handleAddWindow} />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/recipes" element={<Recipes />} />
                <Route exact path="/myrecipes" element={<MyRecipes />} />
            </Routes>
            <div className="relative h-32 w-32" >
                <Button className="absolute bottom-0 right-0 h-16 w-16" onClick={() => setShowShoppingList(!showShoppingList)} />
            </div>
            <Footer />
        </Router>
    )
}

// wrapper component to wrap our App inside Provider component
// 'Provider' is used by redux states
const AppWrapper = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

export default AppWrapper
