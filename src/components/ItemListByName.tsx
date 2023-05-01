import React, { useEffect, useState } from 'react';
import { onSnapshot, Unsubscribe } from 'firebase/firestore';
import { itemsCollectionRef } from '../firebase/collections';
import { useNavigate } from 'react-router-dom';

interface Props {
    name: string
}

const ItemListByName: React.FC<Props> = ({ name }) => {
    const navigate = useNavigate();


    const [items, setItems] = useState<any[]>([]);

    const goToItem = (itemId: string): void => {
        navigate("/item/" + itemId);
    };

    useEffect(() => {
        const unsubscribe: Unsubscribe = onSnapshot(itemsCollectionRef, (snapshot) => {
            const data = snapshot.docs.map((doc: any) => ({
                id: doc.id,
                ...doc.data()
            }));

            const fillteredData = data.filter(doc => doc.name.includes(name) || doc.name.toLowerCase().includes(name))
            setItems(fillteredData);
        });

        return () => {
            console.log("Unsubscribe")
            unsubscribe();
        }
    }, [name]);

    if (items.length === 0) {
        return <span>No Items Found!</span>
    }

    return (
        <ul className='w-full p-2 flex flex-col items-center text-sky-900'>
            {items.map(({ id, name, qty }) => (
                <li
                    key={id}
                    className='h-14 bg-slate-400 mb-3 rounded-md flex justify-between items-center px-4 w-full max-w-screen-md shadow-md hover:text-white hover:bg-slate-500 hover:shadow-lg hover:cursor-pointer transition-all duration-100'
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
    )
}

export default ItemListByName;