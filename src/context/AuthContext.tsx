/* eslint-disable react/react-in-jsx-scope */
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    UserCredential,
} from 'firebase/auth';
import { onSnapshot, Unsubscribe } from 'firebase/firestore';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { usersCollectionRef } from '../firebase/collections';

const UserContext = createContext<any>(null);

export type THeldItem = {
    id: string,
    name: string,
    qty: number,
    timestamp: number
}

type TUserData = {
    name: string;
    isAdmin: boolean;
    itemsHeldByUser: THeldItem[]
    id?: string;
}

type TAuthCtx = {
    createUser: (email: string, password: string) => Promise<UserCredential>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    addUserToDB: (id: string, data: TUserData) => Promise<void>;
    userData: TUserData | null;
    userAuth: UserCredential | null
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [userAuth, setUserAuth] = useState<UserCredential | null>(null)
    const [userData, setUserData] = useState<TUserData | null>(null);

    const createUser = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const addUserToDB = (id: string, data: TUserData) => {
        return setDoc(doc(db, "users", id), data);
    }

    const login = async (email: string, password: string) => {
        const user = await signInWithEmailAndPassword(auth, email, password);
        setUserAuth(user);
    };

    const logout = () => {
        setUserData(null);
        setUserAuth(null);
    };

    const ctxValue: TAuthCtx = {
        createUser,
        logout,
        login,
        addUserToDB,
        userData,
        userAuth
    };

    useEffect(() => {
        if (!userAuth) {
            return;
        }

        const unsubscribe: Unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
            const mappedUsers: TUserData[] = snapshot.docs.map(u => {
                const { name, isAdmin, itemsHeldByUser } = u.data();

                return {
                    id: u.id,
                    name,
                    isAdmin,
                    itemsHeldByUser
                }
            });

            const findUser: TUserData | undefined = mappedUsers.find(u => u.id === userAuth.user.uid);

            if (!findUser) {
                return alert("NO USER FOUND");
            }

            console.log(findUser)
            setUserData(findUser);
        });

        return () => {
            unsubscribe();
        }
    }, [userAuth]);

    return (
        <UserContext.Provider value={ctxValue}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => {
    return useContext<TAuthCtx>(UserContext);
};