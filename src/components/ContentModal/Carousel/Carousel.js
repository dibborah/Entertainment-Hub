import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from "axios"
import { img_300, noPicture } from '../../../config/config';
import "./Carousel.css"

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ media_type, id }) => {

  const [credits, setCredits] = useState();


  const items = credits?.map((c) => (
    <div className="carouselItem">
      <img
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        onDragStart={handleDragStart}
        className='carouselItem_img'
      />
      <b className="carouselItem_txt">{c?.name}</b>
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7
    },
  }

  const fetchCredits = async () => {
    // I don't know my this data is written in flower braceses since it's not a prop but a constant variable 
    const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=5efa4b075d423dc33f2099d2166c935c&language=en-US`)

    setCredits(data.cast);
  };

  useEffect(() => {
    fetchCredits();
  }, []);


  //I don't understand the attributes below
  return (
    <AliceCarousel
      autoPlay
      responsive={responsive}
      infinite
      disableDotsControls
      disableButtonsControls
      mouseTracking 
      items={items}
    />
  );
}

export default Carousel;