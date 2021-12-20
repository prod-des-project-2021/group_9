import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React, { useState } from 'react'
import Home from './components/pages/Home'
import Recipes from './components/pages/Recipes'
import LogIn from './components/LogIn'
import Navbar from './components/Navbar';
import MyRecipes from './components/pages/MyRecipes'
import Recipe from './components/pages/Recipe'
import Footer from './components/Footer';
import { Provider, useSelector, useDispatch } from 'react-redux'
import store from './redux/store'
import { logout } from './redux/actions/auth'
import Button from './components/Button'
import ShoppingList from './components/ShoppingList'
import CustomizedDialogs from './components/Popup'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import icon_shopping_cart from './components/img/shopping_cart_white_24dp.svg';


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
        <div className="flex flex-col h-screen justify-between">
            <Router>
                {!isLoggedIn && renderLogin && <LogIn dismiss={handleRemoveWindow} />}
                <Navbar handleLogout={handleLogout} isLoggedIn={isLoggedIn} mountLogin={handleAddWindow} />
                <div className="mb-auto justify-self-start">
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/linux193/recipes" element={<Recipes />} />
                        <Route exact path="/linux193/myrecipes" element={<MyRecipes />} />
                        <Route exact path="/linux193/recipe" element={<Recipe />} />
                    </Routes>
                </div>
                <div className="relative" >
                    <Button className="fixed bottom-16 right-8 rounded-full h-16 w-16 bg-yellow-200" icon={icon_shopping_cart} clickHandler={() => {
                        console.log(showShoppingList)
                        setShowShoppingList(!showShoppingList)
                    }} />
                </div>
                <ToastContainer />
                <Footer />
                {
                    showShoppingList === true ? <ShoppingList /> : null
                }

            </Router>
        </div>
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
