import React, { useState, useEffect, useContext } from 'react';
import { Row, Container, Col, Card } from 'react-bootstrap';
import FarmerFilter from '../components/FarmerFilter';
import Navbar from '../components/Header/Navbar';
import { AppContext } from '../context/AppContext';
import FeaturedItems from '../components/FeaturedItems';
import { useHistory } from 'react-router-dom';

const Produce = () => {
  const { farmers, produceList, shoppingCart, setShoppingCart } = useContext(
    AppContext
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [chosenStore, setChosenStore] = useState('');
  const [selectedFarmer, setSelectedFarmer] = useState({});

  const history = useHistory();

  const noImg =
    'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';

  useEffect(() => {
    if (chosenStore === '')
      return setSelectedFarmer({ storeName: 'All Stores' });
    const currentFarmer = farmers.filter(
      (farmer) => farmer._id === chosenStore
    );
    setSelectedFarmer(currentFarmer[0]);
  }, [chosenStore, farmers]);

  const displayedList = produceList.filter((produce) => {
    return (
      (produce.farmerStore === chosenStore || !chosenStore) &&
      produce.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <Container>
      <Navbar />
      <FeaturedItems />
      <Row>
        <Col lg="3">
          <FarmerFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            chosenStore={chosenStore}
            setChosenStore={setChosenStore}
            farmers={farmers}
          />
        </Col>
        <Col lg="9">
          {selectedFarmer && <h1>{selectedFarmer.storeName}</h1>}
          <Row>
            {displayedList &&
              displayedList.map((item) => (
                <Col key={item._id} lg="4">
                  <Card
                    style={{
                      width: 200,
                      height: 300,
                      margin: 5,
                      overflow: 'hidden'
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={noImg}
                      alt={item.description}
                      width={200}
                      onClick={() => history.push(`/produce/${item._id}`)}
                    />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>${item.price}</Card.Text>
                    </Card.Body>
                    <button
                      onClick={() => setShoppingCart([...shoppingCart, item])}
                    >
                      Add to Cart
                    </button>
                  </Card>
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Produce;
