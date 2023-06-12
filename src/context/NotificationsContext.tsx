import { Unsubscribe } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { itemsCollectionRef } from "../firebase/collections";

const NotificationsContext = createContext<any>(null);

export const NotificationsContextProvider = ({ children }: { children: ReactNode }) => {
    const [lowQtyItems, setLowQtyItems] = useState<any[]>([]);

    useEffect(() => {
        const unsubscribe: Unsubscribe = onSnapshot(itemsCollectionRef, (snapshot) => {
            const data = snapshot.docs.map((doc: any) => ({
                id: doc.id,
                ...doc.data()
            }));

            const fillteredData = data.filter(item => item.minQtyWanted >= item.qty)
            setLowQtyItems(fillteredData);
        });

        return () => {
            console.log("Unsubscribe")
            unsubscribe();
        }
    }, []);

    return (
        <NotificationsContext.Provider value={{ lowQtyItems }}>
            {children}
        </NotificationsContext.Provider>
    );
}

export const useNotifications = () => {
    return useContext<any>(NotificationsContext);
};