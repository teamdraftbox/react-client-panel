import {createStore,combineReducers,compose} from 'redux'
import firebase from 'firebase'
import 'firebase/firestore'
import {reactReduxFirebase,firebaseReducer} from 'react-redux-firebase'
import {reduxFirestore,firestoreReducer} from 'redux-firestore'
//firebaeconfig
const firebaseConfig = {
    apiKey: "AIzaSyBbuqRJLkTQuNWsoqGeqxGJIPaZFNqPbfQ",
    authDomain: "react-userpanel.firebaseapp.com",
    databaseURL: "https://react-userpanel.firebaseio.com",
    projectId: "react-userpanel",
    storageBucket: "react-userpanel.appspot.com",
    messagingSenderId: "568207877249"
}

// react-reduc-firebase configs
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  }
//init firebse
firebase.initializeApp(firebaseConfig)

const firestore = firebase.firestore()
const settings = {/* your settings... */ timestampsInSnapshots: true};
  firestore.settings(settings);

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase) // <- needed if using firestore
  )(createStore)

  const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer // <- needed if using firestore
  })
//initial state setup  
const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState,compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))
export default store