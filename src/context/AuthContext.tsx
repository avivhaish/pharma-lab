import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    Unsubscribe,
    User,
    UserCredential,
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const UserContext = createContext<any>(null);

type TUserData = {
    name: string;
    isAdmin: boolean
}

type TAuthCtx = {
    createUser: (email: string, password: string) => Promise<UserCredential>;
    userAuth: User | null;
    logout: () => Promise<void>;
    login: (email: string, password: string) => Promise<UserCredential>;
    addUserToDB: (id: string, data: TUserData) => Promise<void>;
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [userAuth, setUserAuth] = useState<User | null>(null);
    const [userData, setUserData] = useState<TUserData | null>(null);

    const createUser = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const addUserToDB = (id: string, data: TUserData) => {
        return setDoc(doc(db, "users", id), data);
    }

    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe: Unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setUserAuth(currentUser);
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        console.log(userAuth)
    }, [userAuth])

    const ctxValue: TAuthCtx = {
        createUser,
        userAuth,
        logout,
        login,
        addUserToDB
    };

    return (
        <UserContext.Provider value={ctxValue}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => {
    return useContext<TAuthCtx>(UserContext);
};