import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cards from './Cards';

function Freebook() {

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get('http://localhost:4001/book');
        console.log(res.data);
        setBook(res.data.filter((data) => data.category === 'Free'));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    getBook();
  }, []);




  return (
    <>
      <div className='max max-w-screen-2xl container mx-auto md:px-20 px-4'>
        <div>
          <h1 className='font-semibold text-xl pb-2'>Free Offered Courses</h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio, vel fugiat dignissimos ratione aut repudiandae.</p>
        </div>


        <div>
          <div className="slider-container">
            <Slider {...settings}>
              {book.map((itme) => (
                <Cards itme={itme} key={itme.id} />
              ))}
            </Slider>
          </div>
        </div>
      </div>

    </>
  )
}

export default Freebook
