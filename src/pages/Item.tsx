import { Unsubscribe } from 'firebase/auth';
import { documentId, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {  Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { itemsCollectionRef } from '../firebase/collections';

const Item: React.FC = () => {
    const { itemId } = useParams();

    const [item, setItem] = useState<any>(null);
    const [qtyToGrab, setQtyToGrab] = useState<number>(1);

    useEffect(() => {
        const q = query(itemsCollectionRef, where(documentId(), "==", itemId));

        const unsubscribe: Unsubscribe = onSnapshot(q, (snapshot) => {
            setItem(snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })))
        });

        return () => {
            console.log("Unsubscribe Item page")
            unsubscribe();
        }
    }, [itemId]);

    return (
        <div className='bg-slate-300 flex flex-col gap-1 items-center text-lg min-w-[250px] w-1/2 rounded-sm p-3 shadow-sm'>
            {item && (
                <>
                    <div className='flex flex-col gap-1'>
                        <span>Item Name: {item[0].name}</span>
                        <span>QTY: {item[0].qty}</span>
                        <span>Toxic: {item[0].isToxic ? "Yes" : "No"}</span>
                    </div>
                    <br />
                    <Form.Group className='w-1/2 text-center'>
                        <Form.Label>Grab Item</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter quantity"
                            min={1}
                            max={item[0].qty}
                            value={qtyToGrab}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQtyToGrab(e.target.valueAsNumber)}
                        />
                    </Form.Group>
                    <button className='py-2 px-4 bg-slate-700 rounded-sm text-white hover:bg-slate-800 transition-all duration-100'>
                        Grab
                    </button>
                </>
            )}
        </div>
    )
}

export default Item