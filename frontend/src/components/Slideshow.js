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
        { width: 800, itemsToShow: 3 },
        { width: 1000, itemsToShow: 4 },
        { width: 2000, itemsToShow: 5 },
    ];

    return (
        <div className="App bg-white p-2 md:p-4 lg:p-8 ">
            <Carousel breakPoints={breakPoints}>
                <img className = "rounded-3xl w-full mx-4 sm:h-44 2xl:h-60 object-cover"  src={one} alt="carouselPic1" />
                <img className = "rounded-3xl w-full mx-4 sm:h-44 2xl:h-60 object-cover"  src={two} alt="carouselPic2"/>
                <img className = "rounded-3xl w-full mx-4 sm:h-44 2xl:h-60 object-cover"  src={three} alt="carouselPic3"/>
                <img className = "rounded-3xl w-full mx-4 sm:h-44 2xl:h-60 object-cover"  src={fore} alt="carouselPic4"/>
                <img className = "rounded-3xl w-full mx-4 sm:h-44 2xl:h-60 object-cover"  src={five} alt="carouselPic5"/>
                <img className = "rounded-3xl w-full mx-4 sm:h-44 2xl:h-60 object-cover"  src={six} alt="carouselPic6"/>
                <img className = "rounded-3xl w-full mx-4 sm:h-44 2xl:h-60 object-cover"  src={seven} alt="carouselPic7"/>
            </Carousel>
        </div>
    );
}
/* md:w-52 lg:w-72 2xl:w-96 */
export default Slideshow;