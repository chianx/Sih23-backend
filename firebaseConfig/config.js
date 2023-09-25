import {initializeApp} from "firebase/app"
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBTRJUcTOjuTlPjo4BlBqUTOvJM2Y1-PMw",
    authDomain: "pgrkam-683e5.firebaseapp.com",
    databaseURL: "https://pgrkam-683e5-default-rtdb.firebaseio.com",
    projectId: "pgrkam-683e5",
    storageBucket: "pgrkam-683e5.appspot.com",
    messagingSenderId: "339913483137",
    appId: "1:339913483137:web:74c6ca174dcfb43f903e80",
    measurementId: "G-N8G48H9MRG"
};

initializeApp(firebaseConfig);
const db = getDatabase();
export default db;


