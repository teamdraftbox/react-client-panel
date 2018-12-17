import {createStore,combineReducers,compose} from 'redux'
import firebase from 'firebase'
import 'firebase/firestore'
import {reactReduxFirebase,firebaseReducer} from 'react-redux-firebase'
import {reduxFirestore,firestoreReducer} from 'redux-firestore'
import notifyReducer from './reducers/notifyReducer'
//firebaeconfig
const firebaseConfig = {
    apiKey: "AIzaSyDw7waIhZ_gnQheJHFyZB-VEv6kzFwec7U",
    authDomain: "okvay-326fe.firebaseapp.com",
    databaseURL: "https://okvay-326fe.firebaseio.com",
    projectId: "okvay-326fe",
    storageBucket: "okvay-326fe.appspot.com",
    messagingSenderId: "465004313434"
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
    firestore: firestoreReducer, // <- needed if using firestore,
    notify:notifyReducer
  })
//initial state setup  
const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState,compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))
export default store