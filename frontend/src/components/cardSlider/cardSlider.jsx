import React from 'react';
import './cardSlider.css';

const CardSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  const cards = [
    { id: 1, title: 'Card 1', content: 'This is the first card.' },
    { id: 2, title: 'Card 2', content: 'This is the second card.' },
    { id: 3, title: 'Card 3', content: 'This is the third card.' },
    { id: 4, title: 'Card 4', content: 'This is the fourth card.' },
    { id: 5, title: 'Card 5', content: 'This is the fifth card.' },
  ];

  return (
    <div className="card-slider-container">
      <Slider {...settings}>
        {cards.map(card => (
          <div key={card.id} className="card-slider-item">
            <div className="card">
              <h3>{card.title}</h3>
              <p>{card.content}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CardSlider;
