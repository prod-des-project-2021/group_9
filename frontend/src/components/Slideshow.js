import React from 'react';
import Carousel from 'react-elastic-carousel';
import Card from "./Card";
import "../index.js";
import "../styles/carousel.css"

export function Slideshow() {

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 500, itemsToShow: 2 },
        { width: 700, itemsToShow: 3 },
        { width: 1300, itemsToShow: 4 }
    ];

    return (
        <div className="App px-4 py-4 bg-white">
            <Carousel breakPoints={breakPoints}>
                <Card number="" />
                <Card number="" />
                <Card number="" />
                <Card number="" />
                <Card number="" />
                <Card number="" />
                <Card number="" />
            </Carousel>
        </div>
    );
}

export default Slideshow;