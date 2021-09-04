import React, { useEffect, useState } from 'react';
import './Cards.css';
import CardItem from './CardItem';
import CardListScrollspy from './CardListScrollspy';
import axios from 'axios';
import { Row, Col, Card, Container } from 'react-bootstrap';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

let settings = {
  dot: false,
  infinite: true,
  speed: 500,
  slideToShow: 4,
  slidesToScroll: 1,
  cssEase: "linear"
}

function Cards() {
  const [cardDetails, setCardDetails] = useState([]);

  const getCardDetails = async () => {
    const cardData = await axios.get('api/homepage/cards')
    if (cardData) return cardData.data;
  };

  useEffect(() => {
    const getAllCardDetails = async () => {
      const allCards = await getCardDetails();
      if (allCards) setCardDetails(allCards);
    };
    getAllCardDetails();
  }, [])
  // console.log(cardDetails);



  return (
    <div className='cards'>
      <h1 className="latest-update-above-card">RECENT UPDATES</h1>
      <Row>
        {cardDetails.map((carding) => (
          <Col key={carding._id} sm={12} md={6} lg={4} xl={3}>
            <CardItem card={carding} />
          </Col>
        ))}
      </Row>
      {/* <Slider {...settings}>
        {cardDetails.map((card) => (
          <div className="card-wrapper">
            <div className="card">

              <div className="card-image">
                <img src={card.coverPhoto} />
              </div>

              <ul>
                <li></li>
              </ul>

            </div>
          </div>
        ))}

      </Slider> */}
    </div>
  );
}

export default Cards;