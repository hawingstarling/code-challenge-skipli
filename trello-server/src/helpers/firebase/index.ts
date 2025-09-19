// Import the functions you need from the SDKs you need
import { firebaseConfig } from '../../config';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
export const storage = getStorage(firebaseApp);