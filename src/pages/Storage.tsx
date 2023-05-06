import { onSnapshot, query, Unsubscribe, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { itemsCollectionRef } from '../firebase/collections';

const Storage: React.FC = () => {
    const [items, setItems] = useState<any[]>([]);

    const { id, name } = useParams();
    const navigate = useNavigate();

    const goToItem = (itemId: string): void => {
        navigate("/item/" + itemId);
    };

    useEffect(() => {
        const q = query(itemsCollectionRef, where("parentStorage", "==", id))

        const unsubscribe: Unsubscribe = onSnapshot(q, (snapshot) => {
            console.log(snapshot)
            setItems(snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })))
        });

        return () => {
            unsubscribe();
        }
    }, [id]);

    if (items.length === 0) {
        return (
            <>
                <span>There are no items in this storage unit.</span>
                <span>Please go to the ADD page, add a new item, and refer it to this storage unit.</span>
            </>
        )
    }

    return (
        <>
            <span className='text-xl font-bold'>{name}</span>
            <ul className='w-full p-2 flex flex-col items-center'>
                {items.map(({ id, name, qty }) => (
                    <li
                        key={id}
                        className='h-14 bg-green-300 mb-3 rounded-md flex justify-between items-center px-4 w-full max-w-screen-md shadow-md hover:text-white hover:bg-emerald-500 hover:shadow-lg hover:cursor-pointer transition-all duration-100'
                        onClick={() => goToItem(id)}
                    >
                        <span>
                            {name}
                        </span>
                        <span>
                            QTY: {qty}
                        </span>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Storage;