import React, { FC, ReactNode } from 'react';
import Header from './Header';

interface Props {
    children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <>
            <Header />
            <main className='flex flex-col flex-1 items-center overflow-x-auto p-2 bg-slate-200'>
                {children}
            </main>
        </>
    );
};

export default Layout;