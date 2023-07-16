import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
    const { userData, userAuth } = useAuth();

    return (
        <div className='flex flex-col gap-1'>
            <div className='flex flex-col gap-1 pt-3'>
                <span>
                    <span className='font-bold text-lg'>
                        Name:
                    </span>
                    {" " + userData?.name}
                </span>
                <span>
                    <span className='font-bold text-lg'>
                        Email:
                    </span>
                    {" " + userAuth?.user.email}</span>
            </div>
            <br />
            <span className='text-center font-bold text-xl'>History</span>
            <ul className='w-full p-2 flex flex-col items-center text-sky-900'>
                {userData?.itemsHeldByUser.length?.toString() !== "0" ? userData?.itemsHeldByUser.sort((a, b) => b.timestamp - a.timestamp).map(item => (
                    <li
                        key={item.id + item.timestamp}
                        className={`${item.isGrabbed ? "bg-orange-300" : "bg-green-300"} mb-3 rounded-md flex flex-col justify-between gap-2 items-center px-3 w-full max-w-screen-md shadow-md hover:text-white ${item.isGrabbed ? "hover:bg-orange-400" : "hover:bg-green-400"} hover:shadow-lg hover:cursor-pointer transition-all duration-100`}
                    >
                        <span>Name: {item.name}</span>
                        <span>Qty: {item.qty}</span>
                        <span>{item.isGrabbed ? "Taken at:" : "Returned at"} {new Date(item.timestamp).toLocaleString()}</span>
                    </li>
                )) : <span>There is no history for this user.</span>}
            </ul>
        </div>
    );
};

export default Profile;