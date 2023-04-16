import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addDoc, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { itemsCollectionRef, storageCollectionRef } from '../firebase/collections';
import IStorage from '../models/Storage';

const NewItemForm = () => {
    const [storages, setStorages] = React.useState<IStorage[]>([]);
    const [itemName, setItemName] = React.useState<string>("");
    const [qty, setQty] = React.useState<number>(0);
    const [storage, setStorage] = React.useState<string>("");
    const [location, setLocation] = React.useState<string>("");
    const [isToxic, setIsToxic] = React.useState<boolean>(false);

    useEffect(() => {
        const unsubscribe: Unsubscribe = onSnapshot(storageCollectionRef, (snapshot) => {
            setStorages(snapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name
            })))
        });

        return () => {
            unsubscribe();
        }
    }, []);

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        // if (!itemName || !qty || !storage || !isToxic) {
        //     return alert("Missing fields");
        // }

        const newItem = {
            name: itemName,
            parentStorage: storage,
            qty,
            isToxic
        };

        try {
            await addDoc(itemsCollectionRef, newItem);
            alert("Item added successfully");
        } catch (error) {
            alert(error);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
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
                <Form.Label>Storage</Form.Label>
                <Form.Select
                    defaultValue="choose an option"
                    onChange={e => setStorage(e.target.value)}
                >
                    <option disabled>choose an option</option>
                    {storages.map(({ id, name }) => (
                        <option key={id} value={id}>{name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formIsAdmin">
                <Form.Label>Is it toxic?</Form.Label>
                <Form.Check
                    checked={isToxic}
                    onChange={() => setIsToxic(state => !state)}
                />
            </Form.Group>
            <Button type="submit" className='w-100'>
                Submit
            </Button>
        </Form >
    )
}

export default NewItemForm