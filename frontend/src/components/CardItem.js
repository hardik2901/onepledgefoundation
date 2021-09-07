import React from 'react';
import { Card, Container } from 'react-bootstrap';


function CardItem({ card }) {
  return (
    <Card className="mb-3">
      <Card.Text as="div" className="mb-2" >
        <Container>
          <div className="my-3">
            {card.Location}
          </div>
        </Container>
      </Card.Text>
      <a href="/">
        <Card.Img src={card.coverPhoto} variant="top" />
      </a>
      <Card.Body>
        <Card.Title as="div">
          <h4><b>{card.title}</b></h4>
        </Card.Title>

        <Card.Text as="div">
          <div className="my-3">
            {card.discription}
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardItem;