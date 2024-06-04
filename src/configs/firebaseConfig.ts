// Import the functions you need from the SDKs you need
import AsyncStorage from '@react-native-async-storage/async-storage'
import { initializeApp } from 'firebase/app'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import { collection, getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBeSDfWMHaGsQCXBobZNqfu9ovwm2CIZTs',
	authDomain: 'music-app-62b9c.firebaseapp.com',
	projectId: 'music-app-62b9c',
	storageBucket: 'music-app-62b9c.appspot.com',
	messagingSenderId: '515580912933',
	appId: '1:515580912933:web:d23bceeb1b7966e76126cc',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
})
export const db = getFirestore(app)
export const usersRef = collection(db, 'users')
