import React from 'react';
import Slider from 'react-slick';
import styles from './HeroCarousel.module.css';

// You can replace these with your own banner images
const bannerImages = [
  "/images/promo_banner.png",
  "/images/promo_banner2.jpg",
  "/images/promo_banner3.png",
];

const HeroCarousel = () => {
  // Settings for the carousel
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Loop the slides
    speed: 500, // Transition speed in ms
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Automatically slide
    autoplaySpeed: 3000, // Wait 3 seconds between slides
  };

  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        {bannerImages.map((img, index) => (
          <div key={index} className={styles.carouselSlide}>
            <img src={img} alt={`Promotional Banner ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroCarousel;