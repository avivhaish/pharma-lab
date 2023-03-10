import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleToggle = () => setIsOpen(prevState => !prevState);

    const { logout, userAuth } = useAuth();

    return (
        <>
            <header className='bg-slate-800 h-20 flex justify-between items-center px-3 font-mono relative'>
                <span className='text-white text-2xl'>PHARMA</span>
                <button
                    className='text-white md:hidden'
                    onClick={handleToggle}
                >
                    {isOpen ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={28} />}
                </button>
            </header>
            {isOpen && (
                <div className='md:hidden bg-slate-400 opacity-90 fixed h-full w-80'>

                </div>
            )}
        </>
    );
}

export default Header;