import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleToggle = () => setIsOpen(prevState => !prevState);

    const { logout, userData, userAuth } = useAuth();

    return (
        <>
            <header className='bg-slate-800 h-20 flex justify-between items-center px-3 relative'>
                <span className='text-white text-2xl hover:cursor-pointer'>PHARMA</span>
                <ul className='text-white hidden md:flex'>
                    {userAuth && (
                        <>
                            <li className='mr-6 hover:cursor-pointer hover:text-teal-600'>
                                <Link to="/">
                                    HOME
                                </Link>
                            </li>
                            <li className='mr-6 hover:cursor-pointer hover:text-teal-600'>
                                <Link to="/profile">
                                    PROFILE
                                </Link>
                            </li>
                        </>
                    )}
                    {userData && userData.isAdmin && (
                        <>
                            <li className='mr-6 hover:cursor-pointer hover:text-teal-600'>
                                <Link to="/add">
                                    ADD
                                </Link>
                            </li>
                        </>
                    )}
                    {userAuth && (
                        <li
                            className='mr-6 hover:cursor-pointer hover:text-teal-600'
                            onClick={logout}
                        >
                            LOGOUT
                        </li>
                    )}
                </ul>
                {userAuth && (
                    <button
                        className='text-white md:hidden'
                        onClick={handleToggle}
                    >
                        {isOpen ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
                    </button>
                )}
            </header>
            {isOpen && (
                <div className='md:hidden flex py-5 px-4 justify-center bg-slate-500 opacity-95 fixed h-full w-full max-w-xs'>
                    <ul className='text-white w-full text-center' onClick={() => setIsOpen(false)}>
                        <li className='mr-6 hover:cursor-pointer text-white hover:text-slate-800 border-b-2 w-full py-2'>
                            <Link to="/">
                                HOME
                            </Link>
                        </li>
                        <li className='mr-6 hover:cursor-pointer text-white hover:text-slate-800 border-b-2 w-full py-2'>
                            <Link to="/profile">
                                PROFILE
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}

export default Header;