import { collection } from "firebase/firestore";
import { db } from "./config";

export const storageCollectionRef = collection(db, "storage");
export const itemsCollectionRef = collection(db, "items");
export const usersCollectionRef = collection(db, "users");
