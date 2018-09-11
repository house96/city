import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/database'

const config = {
  apiKey: 'AIzaSyC_f-wVB1yX1oDNsbYy8ZLuwjliJ-bQ7IM',
  authDomain: 'city-2bedd.firebaseapp.com',
  databaseURL: 'https://city-2bedd.firebaseio.com',
  projectId: 'city-2bedd',
  storageBucket: 'city-2bedd.appspot.com',
  messagingSenderId: '507661592092'
}
firebase.initializeApp(config)

const firebaseDB = firebase.database()
const firebaseMatches = firebaseDB.ref('matches')

export { firebase, firebaseMatches }
