import { FC, ReactNode } from 'react';
import Header from './Header';

interface Props {
    children: ReactNode
}
// style={{ display: "flex", flexDirection: "column", flex: 1, alignItems: "center", overflowX: "auto", padding: "10px" }}
const Layout: FC<Props> = ({ children }) => {
    return (
        <>
            <Header />
            <main className='flex flex-col flex-1 items-center overflow-x-auto p-2 bg-slate-100'>
                {children}
            </main>
        </>
    );
};

export default Layout;