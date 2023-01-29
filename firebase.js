// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
        apiKey: "AIzaSyAsv80qWbhNL2sBL_i3lNUXRQfyIAQU6KY",
        authDomain: "mailapp-ca0c2.firebaseapp.com",
        projectId: "mailapp-ca0c2",
        storageBucket: "mailapp-ca0c2.appspot.com",
        messagingSenderId: "1079041723128",
        appId: "1:1079041723128:web:a8634c44c6e4ac35ae490d"
};

// Initialize Firebase
let app;

if (firebase.apps.length === 0) {
        app = firebase.initializeApp(firebaseConfig);
} else {
        app = firebaes.app();
}
const auth = firebase.auth();

const db = firebase.firestore();


export { auth, db };