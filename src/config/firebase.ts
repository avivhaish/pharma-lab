import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from '@firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBLbWojutb3iElDhxjlTecqH0mxt-dbyJk",
  authDomain: "pharma-lab.firebaseapp.com",
  projectId: "pharma-lab",
  storageBucket: "pharma-lab.appspot.com",
  messagingSenderId: "317806266228",
  appId: "1:317806266228:web:2bf50c4a5bab659ea30e21",
  measurementId: "G-CEVND73KE8"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
