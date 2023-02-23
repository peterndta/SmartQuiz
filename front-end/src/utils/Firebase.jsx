// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

import {
    FIREBASE_apiKey,
    FIREBASE_appId,
    FIREBASE_authDomain,
    FIREBASE_messagingSenderId,
    FIREBASE_projectId,
    FIREBASE_storageBucket,
} from '../config'

// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: FIREBASE_apiKey,
    authDomain: FIREBASE_authDomain,
    projectId: FIREBASE_projectId,
    storageBucket: FIREBASE_storageBucket,
    messagingSenderId: FIREBASE_messagingSenderId,
    appId: FIREBASE_appId,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export { storage }
