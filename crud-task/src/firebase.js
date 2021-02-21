import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyC2D7cgWXfhZtuM66sxkahjrm_CqT4jtAY',
  authDomain: 'crud-fazcode.firebaseapp.com',
  projectId: 'crud-fazcode',
  storageBucket: 'crud-fazcode.appspot.com',
  messagingSenderId: '1099019368942',
  appId: '1:1099019368942:web:e72234f7f9876bcdc136ff',
  measurementId: 'G-E6BNGQ1SP5',
}
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig)
// firebase.analytics()

export const db = fire.firestore()
