import React from 'react';
import Parallax from '../Parallax';

const Home = () => {
    return (
        <div>
            <section className="p-20">
                <h1>Hello World</h1>
                <p>This is the beginning of our ReseptiApp, let's goooooo 8)</p>
            </section>

            <Parallax text={"Welcome to ReseptiApp"} />

            <section className="p-40">
                <p>Tänne reseptisisältöä</p>
            </section>
        </div>

    );
};

export default Home;