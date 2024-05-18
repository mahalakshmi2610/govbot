import React from 'react';
import { Cardd } from './Cardd';
import { Carousel } from './components/Carousel';
import {slides} from "./data/carousel";
function Home() {
    return (
        <div className="content">
        <Carousel data={slides}/>
        <Cardd/>
      </div>
    );
}

export default Home;