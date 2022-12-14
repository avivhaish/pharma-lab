import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    Unsubscribe,
} from 'firebase/auth';
import { auth } from '../firebase/config';

const UserContext = createContext<any>(null);

type TUser = {
    isAdmin: boolean,
    name: string
}

const DUMMY_ADMIN: TUser = {
    isAdmin: true,
    name: "I'm An Admin"
}

const DUMMY_USER: TUser = {
    isAdmin: false,
    name: "I'm A Regular User"
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    // const [user, setUser] = useState<TUser>();
    // const [user, setUser] = useState<TUser>(DUMMY_USER);
    const [user, setUser] = useState<TUser>(DUMMY_ADMIN);

    const createUser = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // const login = (email: string, password: string) => {
    //     return signInWithEmailAndPassword(auth, email, password)
    // }

    const login = (email: string) => {
        setUser({ isAdmin: false, name: email })
    }

    const logout = () => {
        return signOut(auth)
    }

    // useEffect(() => {
    //     const unsubscribe: Unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //         console.log(currentUser);
    //         setUser(currentUser);
    //     });

    //     return unsubscribe;
    // }, []);

    return (
        <UserContext.Provider value={{ createUser, user, logout, login }}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(UserContext);
};