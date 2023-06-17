import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { addDoc, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { itemsCollectionRef, storageCollectionRef } from '../firebase/collections';
import IStorage from '../models/Storage';

const NewItemForm = () => {
    const [storages, setStorages] = React.useState<IStorage[]>([]);
    const [itemName, setItemName] = React.useState<string>("");
    const [qty, setQty] = React.useState<number>(1);
    const [minQtyWanted, setMinQtyWanted] = React.useState<number>(1);
    const [storage, setStorage] = React.useState<string>("");
    const [location, setLocation] = React.useState<string>("");
    const [company, setCompany] = React.useState<string>("");
    const [sku, setSku] = React.useState<string>("");
    const [freezeDate, setFreezeDate] = React.useState<string>("");
    const [isToxic, setIsToxic] = React.useState<boolean>(false);

    console.log(freezeDate)

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

        if (!itemName || !qty || !minQtyWanted || !storage || !location || !company) {
            return alert("Missing fields");
        }

        const newItem = {
            name: itemName,
            parentStorage: storage,
            qty,
            location,
            company,
            isToxic,
            sku,
            freezeDate,
            minQtyWanted
        };

        try {
            await addDoc(itemsCollectionRef, newItem);
            alert("Item added successfully");
            setItemName("");
            setQty(1);
            setMinQtyWanted(1);
            setLocation("");
            setSku("");
            setCompany("");
            setFreezeDate("");
            setIsToxic(false);
        } catch (error) {
            alert("Something went wrong.");
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
                    min={1}
                    value={qty}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQty(e.target.valueAsNumber)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Minimum Quantity To Notify</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter quantity"
                    min={1}
                    value={minQtyWanted}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMinQtyWanted(e.target.valueAsNumber)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Storage</Form.Label>
                <Form.Select
                    defaultValue="choose an option"
                    onChange={e => {
                        setStorage(e.target.value);
                    }}
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
            <Form.Group className="mb-3">
                <Form.Label>Company</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Company"
                    value={company}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompany(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Freeze Date</Form.Label>
                <Form.Control
                    type="date"
                    value={freezeDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFreezeDate(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>SKU</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="SKU"
                    value={sku}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSku(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formIsAdmin">
                <Form.Label>Is it toxic?</Form.Label>
                <Form.Check
                    checked={isToxic}
                    onChange={() => setIsToxic(state => !state)}
                />
            </Form.Group>
            <button
                type="submit"
                className='w-full bg-slate-600 text-white px-2 py-3 rounded hover:bg-slate-700'
            >
                Submit
            </button>
        </Form >
    );
}

export default NewItemForm;