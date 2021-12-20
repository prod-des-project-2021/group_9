import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
//import { Navigate } from 'react-router-dom';
import validator from 'validator'

import { login, register } from '../redux/actions/auth'
import { setMessage } from '../redux/actions/message'

const LogIn = (props) => {
    const [isRegister, setIsRegister] = useState(false);

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const loginRef = useRef()
    const registerRef = useRef()

    const { isLoggedIn } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const switchFormHandler = () => {
        setIsRegister(!isRegister);
    }

    const usernameHandler = (e) => {
        setUsername(e.target.value)
    }
    const emailHandler = (e) => {
        setEmail(e.target.value)
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        setLoading(true)
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
        if (validateForm()) {
            dispatch(register(username, email, password))
                .then(() => {
                    props.history.push("/home")
                    window.location.reload()
                    setIsRegister(false)
                })
                .catch(() => {
                    setLoading(false)
                })
        }
    }

    const validateForm = () => {
        const formElements = registerRef.current.elements
        if (!validator.isEmail(formElements[0].value)) {
            dispatch(setMessage('Please enter a valid email address'))
            return false
        } else if (formElements[1].value.length < 3) {
            dispatch(setMessage('Username minimum length is 3'))
            return false
        } else if (formElements[2].value.length < 6) {
            dispatch(setMessage('Password minimum length is 6'))
            return false
        } else if (formElements[2].value !== formElements[3].value) {
            dispatch(setMessage('Passwords are not matching'))
            return false
        }
        return true
    }

    const dismiss = () => {
        props.dismiss()
    }

    if (isLoggedIn) {
        //return <Navigate to="/" />
    }

    return (
        <div className="fixed t-0 w-full h-screen bg-gray-800 bg-opacity-60 z-50">
            <div className="relative h-full grid place-items-center">
                <div className="relative bg-gray-300 rounded-2xl w-72 md:w-96 h-auto pb-12 shadow-2xl">
                    <button
                        className="absolute top-2 right-2 bg-gray-50 rounded-full w-6"
                        onClick={dismiss}>
                        X
                    </button>

                    {!isRegister
                        ? <LoginForm
                            switchFormHandler={switchFormHandler}
                            handleLogin={handleLogin}
                            usernameHandler={usernameHandler}
                            passwordHandler={passwordHandler}
                            loading={loading}
                            loginRef={loginRef} />
                        : <RegisterForm
                            switchFormHandler={switchFormHandler}
                            handleRegister={handleRegister}
                            usernameHandler={usernameHandler}
                            emailHandler={emailHandler}
                            passwordHandler={passwordHandler}
                            loading={loading}
                            registerRef={registerRef} />
                    }
                </div>
            </div>
        </div>
    );
}

const LoginForm = ({ switchFormHandler, handleLogin, usernameHandler, passwordHandler, loading, loginRef }) => {
    return (
        <div>
            <div className="px-6 pt-4">
                <h1>Login</h1>
            </div>

            <hr className="border-0 bg-yellow-400 h-px mb-4" />

            <div className="flex-row justify-center space-y-2 px-6">
                <form
                    className="flex-row justify-center space-y-2"
                    onSubmit={handleLogin}
                    ref={loginRef}>
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

const RegisterForm = ({ switchFormHandler, handleRegister, usernameHandler, emailHandler, passwordHandler, loading, registerRef }) => {


    return (
        <div>
            <div className="px-6 pt-4">
                <h1>Register</h1>
            </div>

            <hr className="border-0 bg-yellow-400 h-px mb-4" />

            <div className="flex-row justify-center space-y-2 px-6">
                <form
                    className="flex-row justify-center space-y-2"
                    ref={registerRef}>
                    <Input type="text" placeholder="Email" onChange={emailHandler} />
                    <Input type="text" placeholder="Username" onChange={usernameHandler} />
                    <Input type="password" placeholder="Password" onChange={passwordHandler} />
                    <Input type="password" placeholder="Password again" />
                    <button
                        className="bg-yellow-400 hover:bg-yellow-200 rounded-xl p-2 w-full text-center"
                        disabled={loading}
                        onClick={handleRegister}>
                        Register
                    </button>
                </form>

                <button
                    onClick={switchFormHandler}
                    className="bg-gray-50 hover:bg-yellow-200 rounded-xl p-2 w-full text-center shadow-md">
                    Already registered?
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