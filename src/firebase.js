import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getDatabase} from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyA-dJlj7OXsrrggo_sDv3Hl-BC7AB-lfzA',
  authDomain: 'vue-crm-90f41.firebaseapp.com',
  projectId: 'vue-crm-90f41',
  storageBucket: 'vue-crm-90f41.appspot.com',
  messagingSenderId: '896482576849',
  appId: '1:896482576849:web:052495834c28837e5738f0',
  databaseURL:
    'https://vue-crm-90f41-default-rtdb.europe-west1.firebasedatabase.app',
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig)

export const auth = getAuth(firebase)

export const db = getDatabase(firebase)
