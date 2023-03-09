import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ItemCard from '../components/ItemCard';

const DUMMY_ITEMS = [
    { name: "Matter1", quantity: 13, isToxic: true, expirationDate: "09/06/2025" },
    { name: "Matter2", quantity: 4, isToxic: false, expirationDate: "04/11/2025" },
    { name: "Matter3", quantity: 22, isToxic: true, expirationDate: "09/08/2023" },
    { name: "Matter4", quantity: 11, isToxic: true, expirationDate: "08/08/2024" },
    { name: "Matter5", quantity: 6, isToxic: true, expirationDate: "14/04/2025" },
    { name: "Matter6", quantity: 1, isToxic: false, expirationDate: "09/02/2025" },
    { name: "Matter7", quantity: 1, isToxic: true, expirationDate: "11/04/2027" },
    { name: "Matter8", quantity: 19, isToxic: false, expirationDate: "07/10/2024" },
    { name: "Matter9", quantity: 3, isToxic: false, expirationDate: "20/12/2027" },
]

const Items: React.FC = () => {
    return (
        <Container>
            <Row className='flex justify-content-center'>
                {DUMMY_ITEMS.map(({ name, quantity, isToxic, expirationDate }) => (
                    <Col md={4}>
                        <ItemCard
                            key={name}
                            name={name}
                            quantity={quantity}
                            isToxic={isToxic}
                            expirationDate={expirationDate}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Items;