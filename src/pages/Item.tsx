import { Unsubscribe } from 'firebase/auth';
import { documentId, onSnapshot, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { THeldItem, useAuth } from '../context/AuthContext';
import { itemsCollectionRef, usersCollectionRef } from '../firebase/collections';
import { db } from '../firebase/config';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';

const Item: React.FC = () => {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const { userData } = useAuth();

    const [item, setItem] = useState<any>(null);
    const [qtyToGrab, setQtyToGrab] = useState<number>(0);

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

    const handleGrabItem = async () => {
        // edit the item doc (modify its qty);
        // edit the user doc (add the item id, name, qty and timestamp of grabing to its array.)
        try {
            const userId = userData?.id;

            if (!userId) {
                return;
            }

            if (qtyToGrab === 0) {
                return alert("Can't grab 0 items")
            }

            if (item[0].qty === 0) {
                return alert("This item is out of stock")
            }

            const newQty = { qty: item[0].qty - qtyToGrab }
            const itemDoc = doc(db, "items", item[0].id);
            const userDoc = doc(db, "users", userId);
            const newHeldItem: THeldItem = {
                id: item[0].id,
                name: item[0].name,
                qty: qtyToGrab,
                timestamp: Date.now()
            }
            const newGrabbedArray = {
                itemsHeldByUser: [...userData.itemsHeldByUser, newHeldItem]
            };
            await updateDoc(itemDoc, newQty);
            await updateDoc(userDoc, newGrabbedArray);
            alert(`Grabbed ${qtyToGrab} ${item[0].name} successfully`);
            setQtyToGrab(1);
        } catch (error) {
            console.log(error)
        }
    };

    const handleDeleteItem = async () => {
        if (!confirm("Are you sure you want to delete this item?")) {
            return alert("Process aborted!");
        }

        try {
            await deleteDoc(doc(db, "items", item[0].id));
            setItem(null);
            alert("deleted");
            return navigate(-1);

        } catch (error) {
            alert(error)
        }
    }

    if (!userData) {
        return <Navigate
            to="/login"
            state={{ from: location }}
            replace
        />
    }

    return (
        <div className=' bg-green-200 flex flex-col gap-1 items-center text-lg min-w-[250px] w-1/2 rounded-sm p-3 shadow-md'>
            {item ? (
                <>
                    {userData && userData.isAdmin && (
                        <div className='flex gap-2 w-full'>
                            <button
                                className="bg-red-600 text-white py-2 px-3 rounded-sm self-start shadow-md hover:bg-red-700 hover:shadow-lg"
                                onClick={handleDeleteItem}
                            >
                                <FaTrashAlt />
                            </button>
                            {/* edit btn */}
                            {/* <button className="bg-orange-500 text-white py-2 px-3 rounded-sm self-start shadow-md hover:bg-orange-600 hover:shadow-lg">
                                <FaPencilAlt />
                            </button> */}
                        </div>
                    )}

                    <div className='flex flex-col gap-1'>
                        <span>Item Name: {item[0]?.name}</span>
                        <span>SKU: {item[0]?.sku}</span>
                        <span>QTY: {item[0]?.qty}</span>
                        <span>Company: {item[0]?.company}</span>
                        <span>Location: {item[0]?.location}</span>
                        <span>Toxic?: {item[0]?.isToxic ? "Yes" : "No"}</span>
                    </div>
                    <br />
                    <div className='w-full flex flex-col py-3 gap-3 items-center border-t'>
                        <Form.Group className='w-1/2 text-center'>
                            <Form.Label>Grab Item</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter quantity"
                                min={1}
                                max={item[0]?.qty}
                                value={qtyToGrab}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQtyToGrab(e.target.valueAsNumber)}
                            />
                        </Form.Group>
                        <button
                            className='py-2 px-4 w-1/2 bg-slate-700 rounded-sm text-white hover:bg-slate-800 transition-all duration-100'
                            onClick={handleGrabItem}
                        >
                            Grab
                        </button>
                    </div>
                </>
            ) : null}
        </div>
    )
}

export default Item