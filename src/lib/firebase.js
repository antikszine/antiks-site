import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { getApps, getApp, deleteApp } from "firebase/app";

const config = {
  apiKey: "AIzaSyCAF_M8CF5CNEY_8a7aBYc_1p6n1c173-I",
  authDomain: "lost-and-found2025.firebaseapp.com",
  projectId: "lost-and-found2025",
  storageBucket: "lost-and-found2025.firebasestorage.app",
  messagingSenderId: "177640332607",
  appId: "1:177640332607:web:291647746288ed7c35478a"
};

let app;
if (!getApps().length){
	app = initializeApp(config);
} else {
    app = getApp();
    deleteApp(app);
    app = initializeApp(config);
}
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

auth.onAuthStateChanged(auth => {
    if (auth) {
        console.log('logged in');
    } else {
        console.log('not logged in');
    }
});
