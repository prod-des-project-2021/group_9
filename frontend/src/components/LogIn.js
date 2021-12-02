import React, { useState, useEffect } from 'react';

const LogIn = () => {
    const [register, setRegister] = useState(false);

    const switchFormHandler = (value) => () => {
        setRegister(value);
    }

    return (
        <div className="fixed t-0 w-full h-screen bg-gray-800 bg-opacity-60">
            <div className="relative h-full grid place-items-center">
                <div className="relative bg-gray-300 rounded-2xl w-72 md:w-96 h-auto pb-12 shadow-2xl">
                    <button className="absolute top-2 right-2 bg-gray-50 rounded-full w-6">.</button>

                    {!register
                    ? <LoginForm switchFormHandler={switchFormHandler(true)} />
                    : <RegisterForm switchFormHandler={switchFormHandler(false)} />
                    }
                    
                </div>
            </div>
        </div>
    );
}

const LoginForm = ({switchFormHandler}) => {
    return(
        <div>
            <div className="px-6 pt-4">
                <h1>Login</h1>
            </div>

            <hr className="border-0 bg-yellow-400 h-px mb-4"/>

            <div className="flex-row justify-center space-y-2 px-6">
                <form className="flex-row justify-center space-y-2">
                    <Input type="text" placeholder="Email or Username" />
                    <Input type="password" placeholder="Password" />
                    <button className="bg-yellow-400 hover:bg-yellow-200 rounded-xl p-2 w-full text-center shadow-md">Login</button>
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

const RegisterForm = ({switchFormHandler}) => {
    return(
        <div>
            <div className="px-6 pt-4">
                <h1>Register</h1>
            </div>

            <hr className="border-0 bg-yellow-400 h-px mb-4"/>

            <div className="flex-row justify-center space-y-2 px-6">
                <form className="flex-row justify-center space-y-2">
                    <Input type="text" placeholder="Email" />
                    <Input type="text" placeholder="Username" />
                    <Input type="password" placeholder="Password" />
                    <Input type="password" placeholder="Password again" />
                    <button className="bg-yellow-400 hover:bg-yellow-200 rounded-xl p-2 w-full text-center">Register</button>
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

const Input = ({type, placeholder}) => {
    return(
        <input
            type={type}
            placeholder={placeholder}
            className="rounded-xl p-2 w-full"
        />
    );
}

export default LogIn;