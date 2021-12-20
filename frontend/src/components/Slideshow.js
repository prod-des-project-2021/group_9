import React from 'react';
import Carousel from 'react-elastic-carousel';
import Card from "./Card";
import "../index.js";
import "../styles/carousel.css"
import one from './img/carousel/kolomen.jpg'
import two from './img/carousel/kolomen.jpg'
import three from './img/carousel/kolomen.jpg'
import fore from './img/carousel/kolomen.jpg'
import five from './img/carousel/kolomen.jpg'
import six from './img/carousel/kolomen.jpg'
import seven from './img/carousel/kolomen.jpg'



export function Slideshow() {

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 500, itemsToShow: 2 },
        { width: 700, itemsToShow: 3 },
        { width: 1300, itemsToShow: 4 },
        { width: 2000, itemsToShow: 5 },
    ];

    return (
        <div className="App bg-white p-8 ">
            <Carousel className= "sm:h-50"breakPoints={breakPoints}>
                <img className = "rounded-3xl w-full md:w-52 lg:w-72 2xl:w-96"  src={one} alt="carouselPic1" />
                <img className = "rounded-3xl w-full md:w-52 lg:w-72 xl:w-96"  src={two} alt="carouselPic2"/>
                <img className = "rounded-3xl w-full md:w-52 lg:w-72 xl:w-96"  src={three} alt="carouselPic3"/>
                <img className = "rounded-3xl w-full md:w-52 lg:w-72 xl:w-96"  src={fore} alt="carouselPic4"/>
                <img className = "rounded-3xl w-full md:w-52 lg:w-72 xl:w-96"  src={five} alt="carouselPic5"/>
                <img className = "rounded-3xl w-full md:w-52 lg:w-72 xl:w-96"  src={six} alt="carouselPic6"/>
                <img className = "rounded-3xl w-full md:w-52 lg:w-72 xl:w-96"  src={seven} alt="carouselPic7"/>
            </Carousel>
        </div>
    );
}

export default Slideshow;