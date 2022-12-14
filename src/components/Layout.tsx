import { FC, ReactNode } from 'react';
import Header from './Header';

interface Props {
    children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <>
            <Header />
            <main style={{ display: "flex", flexDirection: "column", flex: 1, alignItems: "center", overflowX: "auto", padding: "10px" }}>
                {children}
            </main>
        </>
    );
};

export default Layout;