import React, { useEffect } from 'react';
import '../cssFiles/Cards.css';
import CardItem from './CardItem';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { homepageCardList } from '../actions/homepageCardActions'
import Loader from '../components/Loader'
import Message from '../components/Message';

function Cards() {

  const dispatch = useDispatch()

  const homepageCards = useSelector(state => state.homepageCards)
  const { loading, error, cards } = homepageCards
  useEffect(() => {
    dispatch(homepageCardList())
  }, [dispatch])
  // console.log(cardDetails);

  return (
    <div className='cards'>
      <h1 className="latest-update-above-card">RECENT UPDATES</h1>
      {loading ? <Loader /> : error ? <Message variant="danger" children={error} /> :
        <Row>
          {cards.map((carding) => (
            <Col key={carding._id} sm={12} md={6} lg={4} xl={3}>
              <CardItem card={carding} />
            </Col>
          ))}
        </Row>
      }

    </div>
  );
}

export default Cards;