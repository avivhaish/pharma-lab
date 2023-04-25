import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
    const { userData, userAuth } = useAuth();

    return (
        <div className='flex flex-col gap-1'>
            <span>Name: {userData?.name}</span>
            <span>Email: {userAuth?.user.email}</span>

            <span>history</span>
            <ul className='w-full p-2 flex flex-col items-center text-sky-900'>
                {userData?.itemsHeldByUser.map(item => (
                    <li
                        key={item.id + item.timestamp}
                        className='bg-slate-400 mb-3 rounded-md flex flex-col justify-between gap-2 items-center px-3 w-full max-w-screen-md shadow-md hover:text-white hover:bg-slate-500 hover:shadow-lg hover:cursor-pointer transition-all duration-100'
                    >
                        <span>Name: {item.name}</span>
                        <span>Qty: {item.qty}</span>
                        <span>Taken at: {new Date(item.timestamp).toLocaleString()}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Profile;