import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
//import { Navigate } from 'react-router-dom';

import { login } from '../redux/actions/auth'

const LogIn = (props) => {
    const [register, setRegister] = useState(false);

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const { isLoggedIn, user } = useSelector(state => state.auth)
    const { message } = useSelector(state => state.message)

    const dispatch = useDispatch()

    const switchFormHandler = () => {
        setRegister(!register);
    }

    const usernameHandler = (e) => {
        setUsername(e.target.value)
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        setLoading(true)
        // validate form?
        dispatch(login(username, password))
            .then(() => {
                props.history.push("/profile");
                window.location.reload();
            })
            .catch(() => {
                setLoading(false)
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        // validate form?
    }

    if (isLoggedIn) {
        //return <Navigate to="/" />
    }

    return (
        <div className="fixed t-0 w-full h-screen bg-gray-800 bg-opacity-60">
            <div className="relative h-full grid place-items-center">
                <div className="relative bg-gray-300 rounded-2xl w-72 md:w-96 h-auto pb-12 shadow-2xl">
                    <button className="absolute top-2 right-2 bg-gray-50 rounded-full w-6">X</button>

                    {!register
                        ? <LoginForm
                            switchFormHandler={switchFormHandler}
                            handleLogin={handleLogin}
                            usernameHandler={usernameHandler}
                            passwordHandler={passwordHandler}
                            loading={loading} />
                        : <RegisterForm
                            switchFormHandler={switchFormHandler}
                            handleRegister={handleRegister}
                            usernameHandler={usernameHandler}
                            passwordHandler={passwordHandler}
                            loading={loading} />
                    }
                    <div>
                        {message && (
                            <div role="alert">
                                <p>{message}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

const LoginForm = ({ switchFormHandler, handleLogin, usernameHandler, passwordHandler, loading }) => {
    return (
        <div>
            <div className="px-6 pt-4">
                <h1>Login</h1>
            </div>

            <hr className="border-0 bg-yellow-400 h-px mb-4" />

            <div className="flex-row justify-center space-y-2 px-6">
                <form className="flex-row justify-center space-y-2"
                    onSubmit={handleLogin}>
                    <Input type="text" placeholder="Email or Username" onChange={usernameHandler} />
                    <Input type="password" placeholder="Password" onChange={passwordHandler} />
                    <button
                        className="bg-yellow-400 hover:bg-yellow-200 rounded-xl p-2 w-full text-center shadow-md"
                        disabled={loading}
                    >Login</button>
                </form>

                <button
                    onClick={switchFormHandler}
                    className="bg-gray-50 hover:bg-yellow-200 rounded-xl p-2 w-full text-center shadow-md">
                    Register
                </button>
            </div>
        </div>
    );
}

const RegisterForm = ({ switchFormHandler, usernameHandler, passwordHandler, loading }) => {
    return (
        <div>
            <div className="px-6 pt-4">
                <h1>Register</h1>
            </div>

            <hr className="border-0 bg-yellow-400 h-px mb-4" />

            <div className="flex-row justify-center space-y-2 px-6">
                <form className="flex-row justify-center space-y-2">
                    <Input type="text" placeholder="Email" />
                    <Input type="text" placeholder="Username" onChange={usernameHandler} />
                    <Input type="password" placeholder="Password" onChange={passwordHandler} />
                    <Input type="password" placeholder="Password again" />
                    <button
                        className="bg-yellow-400 hover:bg-yellow-200 rounded-xl p-2 w-full text-center"
                        disabled={loading}>
                        Register
                    </button>
                </form>

                <button
                    onClick={switchFormHandler}
                    className="bg-gray-50 hover:bg-yellow-200 rounded-xl p-2 w-full text-center shadow-md">
                    Login
                </button>
            </div>
        </div>
    );
}

const Input = ({ type, placeholder, onChange }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className="rounded-xl p-2 w-full"
            onChange={onChange}
        />
    );
}

export default LogIn;