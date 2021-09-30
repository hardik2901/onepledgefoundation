import React from 'react';
import { Card, Container } from 'react-bootstrap';
import Flippy, { FrontSide, BackSide } from 'react-flippy';


function CardItem({ card }) {
  return (
    <>
      <Flippy
        style={{ borderRadius: "25px", padding: "0px", width: "auto", height: "300px" }}
        flipOnHover={true}
        flipOnClick={true}
        flipDirection="vertical"
      >
        <FrontSide
          style={{
            backgroundImage: `url(${card.coverPhoto})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
          }}
        >
        </FrontSide>
        <BackSide
          style={{
            backgroundImage: `url(/images/background3.jpeg)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",

          }}>
          <h1 style={{ color: "white" }}>{card.title}</h1>
          <br />
          <h5 style={{ color: "white" }}>{card.discription}</h5>

        </BackSide>
      </Flippy>
    </>

  );
}

export default CardItem;