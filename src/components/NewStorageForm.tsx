import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Unsubscribe, addDoc, onSnapshot } from 'firebase/firestore';
import { storageCollectionRef } from '../firebase/collections';
import IStorage from '../models/Storage';

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
    const [storages, setStorages] = useState<IStorage[]>([]);

    useEffect(() => {
        const unsubscribe: Unsubscribe = onSnapshot(storageCollectionRef, (snapshot) => {
            setStorages(snapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name
            })))
        });

        return () => {
            console.log("Unsubscribe")
            unsubscribe();
        }
    }, []);

    return (
        <Form onSubmit={async (e: React.SyntheticEvent) => {
            e.preventDefault();

            if (!storageType) {
                return alert("Please select a storage type");
            }

            const name = `${storageType} (${storageNumber})`;

            if (storages.find((s) => s.name === name)) {
                return alert("Storage number is taken");
            }

            try {
                await addDoc(storageCollectionRef, {
                    name
                });
                alert("Created a new Storage successfully!");
            } catch (error) {
                alert(error);
            }
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
            <button
                type="submit"
                className='w-full bg-slate-600 text-white px-2 py-3 rounded hover:bg-slate-700'
            >
                Submit
            </button>
        </Form>
    );
}

export default NewStorageForm;
