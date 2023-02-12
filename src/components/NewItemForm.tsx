import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const NewItemForm = () => {
    const [itemName, setItemName] = React.useState<string>("");
    const [qty, setQty] = React.useState<number>(0);
    const [notes, setNotes] = React.useState<string>("");
    const [isToxic, setIsToxic] = React.useState<boolean>(false);

    return (
        <Form onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();
            alert("Created a new item successfully!");
        }}>
            <Form.Group className="mb-3">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter item name"
                    value={itemName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setItemName(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter quantity"
                    min={0}
                    value={qty}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQty(e.target.valueAsNumber)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Notes"
                    value={notes}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNotes(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formIsAdmin">
                <Form.Label>Is it toxic?</Form.Label>
                <Form.Check
                    checked={isToxic}
                    onChange={() => setIsToxic(state => !state)}
                />
            </Form.Group>
            <Button variant="primary" type="submit" className='w-100'>
                Submit
            </Button>
        </Form>
    )
}

export default NewItemForm