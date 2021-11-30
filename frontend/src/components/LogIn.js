import React, { useState, useEffect } from 'react';

const Home = () => {
    const [register, setRegister] = useState(true);

    return (
        <div className="fixed t-0 w-full h-screen bg-gray-800 bg-opacity-60">
            <div className="relative h-full grid place-items-center">
                <div className="relative bg-gray-300 rounded-2xl w-1/4 h-auto pb-24 shadow-2xl">
                    <button className="absolute top-2 right-2 bg-gray-50 rounded-full w-6">.</button>

                    {!register
                    ? <LoginForm />
                    : <RegisterForm />
                    }
                    
                </div>
            </div>
        </div>
    );
};

const LoginForm = () => {
    return(
        <div>
            <div className="px-6 pt-4">
                <h1>Login</h1>
            </div>
            <hr className="border-0 bg-yellow-400 h-px mb-4"/>
            <div className="flex justify-center px-6">
                <form className="flex-row justify-center space-y-2">
                    <Input type="text" placeholder="Email or Username" />
                    <Input type="password" placeholder="Password" />
                    <button className="bg-yellow-400 rounded-xl p-2 w-full text-center">Login</button>
                </form>
            </div>
        </div>
    );
};

const RegisterForm = () => {
    return(
        <div>
            <div className="px-6 pt-4">
                <h1>Register</h1>
            </div>
            <hr className="border-0 bg-yellow-400 h-px my-4"/>
            <div className="flex justify-center px-6">
                <form className="flex-row justify-center space-y-2">
                    <Input type="text" placeholder="Email" />
                    <Input type="text" placeholder="Username" />
                    <Input type="password" placeholder="Password" />
                    <Input type="password" placeholder="Password again" />
                    <button className="bg-yellow-400 rounded-xl p-2 w-full text-center">Register</button>
                </form>
            </div>
            <hr className="border-0 bg-yellow-400 h-px my-4"/>
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

export default Home;