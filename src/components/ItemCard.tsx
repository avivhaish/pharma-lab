import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Form } from 'react-bootstrap';

interface Props {
    name: string,
    quantity: number,
    isToxic: boolean,
    expirationDate: string
}

const ProductCard: React.FC<Props> = ({ name, quantity, isToxic, expirationDate }) => {
    const [qty, setQty] = useState<number>(0);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQty(e.target.valueAsNumber);
    };

    const handleQuantityUpdate = () => {
        // TODO: Handle updating the quantity
    };

    return (
        <Card className="mx-auto mb-1" style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Quantity: {quantity}</Card.Subtitle>
                <Card.Text>Toxicity: {isToxic ? 'Yes' : 'No'}</Card.Text>
                <Card.Text>Expiration Date: {expirationDate}</Card.Text>
                <Form.Group className='mb-2' controlId="formQuantity">
                    <Form.Label>Borrow Item</Form.Label>
                    <Form.Control type="number" value={qty} onChange={handleQuantityChange} max={quantity} min={0} />
                </Form.Group>
                <Button className='' variant="primary" onClick={handleQuantityUpdate}>Update Quantity</Button>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
