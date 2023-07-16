import { onSnapshot, Unsubscribe } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageCollectionRef } from '../firebase/collections';
import IStorage from '../models/Storage';
import ItemListByName from '../components/ItemListByName';

const Home: React.FC = () => {
    const [storages, setStorages] = useState<IStorage[]>([]);
    const [itemInput, setItemInput] = useState<string>("");

    const navigate = useNavigate();

    const goToStorage = (storageId: string, storageName: string): void => {
        navigate("/storage/" + storageId + "/" + storageName);
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
        <>
            <span className='text-xl'>Search for an item by name</span>
            <input
                className='p-2 w-3/5 max-w-md'
                type="text"
                placeholder='Enter name...'
                value={itemInput}
                onChange={(e) => setItemInput(e.target.value)}
            />
            <br />
            {itemInput.length > 0 && (
                <ItemListByName name={itemInput} storages={storages} />
            )}
            {itemInput.length === 0 && (
                <>
                    <span className='text-xl'>Storages</span>
                    {storages.length === 0 && (
                        <span>There are no storages. Please go to the ADD page, and create a storgae unit.</span>
                    )}
                    <ul className='w-full p-2 flex flex-col items-center text-sky-900 border-t'>
                        {storages.sort((a, b) => a.name.localeCompare(b.name)).map(({ id, name }) => (
                            <li
                                key={id}
                                className='h-14 bg-slate-400 mb-3 rounded-md flex justify-center items-center px-3 w-full max-w-screen-md shadow-md hover:text-white hover:bg-slate-500 hover:shadow-lg hover:cursor-pointer transition-all duration-100'
                                onClick={() => goToStorage(id, name)}
                            >
                                {name}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    );
};

export default Home;