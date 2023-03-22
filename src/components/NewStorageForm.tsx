import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const enum EStorageTypes {
    Cabinet = "Cabinet",
    Refrigerator = "Refrigerator",
    LiquidNitrogen = "Liquid Nitrogen",
    FreezerMinus20 = "Freezer -20",
    FreezerMinus80 = "Freezer -80"
}

const options: EStorageTypes[] = [
    EStorageTypes.Cabinet,
    EStorageTypes.Refrigerator,
    EStorageTypes.LiquidNitrogen,
    EStorageTypes.FreezerMinus20,
    EStorageTypes.FreezerMinus80
];

const NewStorageForm = () => {
    const [storageType, setStorageType] = React.useState<EStorageTypes>();
    const [storageNumber, setStorageNumber] = React.useState<number>(0);

    return (
        <Form onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();
            alert("Created a new Storage successfully!");
        }}>
            <Form.Group className="mb-3">
                <Form.Label>StorageType</Form.Label>
                <Form.Select
                    defaultValue="choose an option"
                    value={storageType}
                    onChange={e => setStorageType(e.target.value as EStorageTypes)}
                >
                    <option disabled>choose an option</option>
                    {options.map((o) => <option key={o} value={o}>{o}</option>)}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Storage Number</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter number"
                    min={0}
                    value={storageNumber}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStorageNumber(e.target.valueAsNumber)}
                />
            </Form.Group>
            <Button variant="primary" type="submit" className='w-100'>
                Submit
            </Button>
        </Form>
    )
}

export default NewStorageForm;