import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { onSnapshot, Unsubscribe } from 'firebase/firestore';
import { usersCollectionRef } from '../firebase/collections';
import { Form } from 'react-bootstrap';

const Admin: React.FC = () => {
    const { userData } = useAuth();

    const [users, setUsers] = useState<any>([]);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    useEffect(() => {
        const unsubscribe: Unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
            setUsers(snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })))
        });

        return () => {
            console.log("Unsubscribe")
            unsubscribe();
        }
    }, []);

    return (
        <div className='flex flex-col gap-3'>
            <span className='text-lg'>
                <span className='font-bold'>Admin Name:</span>
                {" " + userData?.name}</span>
            <span className='text-lg'>Inventory actions history</span>
            <span className='text-lg'>Select a user:</span>
            {users.length > 0 && (
                <Form.Select
                    defaultValue="choose an option"
                    value={selectedUser}
                    onChange={e => setSelectedUser(e.target.value)}
                >
                    <option disabled>Choose an option</option>
                    {users.map((user: any) => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </Form.Select>
            )}
            < ul className='w-full p-2 flex flex-col items-center text-sky-900'>
                {users.length > 0 && selectedUser &&
                    users.find((user: any) => user.id === selectedUser)?.itemsHeldByUser.sort((a: any, b: any) => b.timestamp - a.timestamp).map((item: any) => (
                        < li
                            key={item.id + item.timestamp}
                            className={`${item.isGrabbed ? "bg-orange-300" : "bg-green-300"} mb-3 rounded-md flex flex-col justify-between gap-2 items-center px-3 w-full max-w-screen-md shadow-md hover:text-white ${item.isGrabbed ? "hover:bg-orange-400" : "hover:bg-green-400"} hover:shadow-lg hover:cursor-pointer transition-all duration-100`}
                        >
                            <span>Name: {item.name}</span>
                            <span>Qty: {item.qty}</span>
                            <span>{item.isGrabbed ? "Taken at:" : "Returned at"} {new Date(item.timestamp).toLocaleString()}</span>
                        </li>
                    ))
                }
            </ul>
        </div >
    );
};

export default Admin;