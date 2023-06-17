import { Unsubscribe } from 'firebase/auth';
import { documentId, onSnapshot, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { THeldItem, useAuth } from '../context/AuthContext';
import { itemsCollectionRef, storageCollectionRef, usersCollectionRef } from '../firebase/collections';
import { db } from '../firebase/config';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import IStorage from '../models/Storage';

const Item: React.FC = () => {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const { userData } = useAuth();

    const [item, setItem] = useState<any>(null);
    const [qtyToGrab, setQtyToGrab] = useState<number>(0);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [storages, setStorages] = React.useState<IStorage[]>([]);


    // edit form
    const [itemName, setItemName] = React.useState<string>("");
    const [qty, setQty] = React.useState<number>(1);
    const [minQtyWanted, setMinQtyWanted] = React.useState<number>();
    const [storage, setStorage] = React.useState<string>("");
    const [location, setLocation] = React.useState<string>("");
    const [company, setCompany] = React.useState<string>("");
    const [sku, setSku] = React.useState<string>("");
    const [freezeDate, setFreezeDate] = React.useState<string>("");
    const [isToxic, setIsToxic] = React.useState<boolean>(false);

    useEffect(() => {
        const q = query(itemsCollectionRef, where(documentId(), "==", itemId));

        const unsubscribe: Unsubscribe = onSnapshot(q, (snapshot) => {
            const data: any = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setItem(data);

            // set edit form states
            setItemName(data[0]?.name);
            setQty(data[0]?.qty);
            setMinQtyWanted(data[0]?.minQtyWanted)
            setLocation(data[0]?.location)
            setCompany(data[0]?.company)
            setSku(data[0]?.sku);
            setFreezeDate(data[0]?.freezeDate);
            setIsToxic(data[0]?.isToxic);
        });

        return () => {
            console.log("Unsubscribe Item page")
            unsubscribe();
        }
    }, [itemId]);

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

    const handleEditItem = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        try {
            if (!itemName || !qty || !minQtyWanted || !storage || !location || !company) {
                return alert("Missing fields");
            }

            await updateDoc(doc(db, "items", item[0].id), {
                name: itemName,
                parentStorage: storage,
                qty,
                location,
                company,
                isToxic,
                sku,
                freezeDate,
                minQtyWanted
            });

            alert("Item updated successfully");
        } catch (error) {
            alert(JSON.stringify(error));
        }
    }

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

    const toggleEditMode = () => setIsEditMode(mode => !mode);

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
                            {userData.isAdmin && (
                                <button
                                    className="bg-orange-500 text-white py-2 px-3 rounded-sm self-start shadow-md hover:bg-orange-600 hover:shadow-lg"
                                    onClick={toggleEditMode}
                                >
                                    <FaPencilAlt />
                                </button>
                            )}
                        </div>
                    )}

                    {!isEditMode && (
                        <div className='flex flex-col gap-1'>
                            <span>Item Name: {item[0]?.name}</span>
                            <span>SKU: {item[0]?.sku}</span>
                            <span>QTY: {item[0]?.qty}</span>
                            <span>Company: {item[0]?.company}</span>
                            <span>Location: {item[0]?.location}</span>
                            {item[0]?.freezeDate && (
                                <span>Freeze Date: {new Date(item[0]?.freezeDate).toLocaleDateString()}</span>
                            )}
                            <span>Toxic?: {item[0]?.isToxic ? "Yes" : "No"}</span>
                        </div>
                    )}
                    {isEditMode && (
                        <Form onSubmit={handleEditItem}>
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
                                Submit Edit
                            </button>
                        </Form >
                    )}

                    <br />
                    {!isEditMode && (
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
                                className={`py-2 px-4 w-1/2 ${isEditMode ? "bg-gray-400" : "bg-slate-700 hover:bg-slate-800"}  rounded-sm text-white  transition-all duration-100`}
                                onClick={handleGrabItem}
                                disabled={isEditMode}
                            >
                                Grab
                            </button>
                        </div>
                    )}
                </>
            ) : null}
        </div>
    )
}

export default Item