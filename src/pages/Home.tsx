import { onSnapshot, Unsubscribe } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageCollectionRef } from '../firebase/collections';
import IStorage from '../models/Storage';

const Home: React.FC = () => {
    const [storages, setStorages] = useState<IStorage[]>([]);

    const navigate = useNavigate();

    const goToStorage = (storageId: string): void => {
        navigate("/storage/" + storageId);
    }

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
        <ul className='w-full p-2 flex flex-col items-center text-sky-900'>
            {storages.map(({ id, name }) => (
                <li
                    key={id}
                    className='h-14 bg-slate-400 mb-3 rounded-md flex justify-center items-center px-3 w-full max-w-screen-md shadow-md hover:text-white hover:bg-slate-500 hover:shadow-lg hover:cursor-pointer transition-all duration-100'
                    onClick={() => goToStorage(id)}
                >
                    {name}
                </li>
            ))}
        </ul>
    );
};

export default Home;