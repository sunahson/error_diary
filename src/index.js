import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/';
import { createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { firebaseReducer, reactReduxFirebase } from 'react-redux-firebase';
import { firestoreReducer, reduxFirestore } from 'redux-firestore';

const config = {
  userProfile: 'users',
  enableLogging: true,
  useFirestoreForProfile: true
};

const firebaseConfig = {
  apiKey: "AIzaSyA5K4o90zb6Ok6Dfs-SNKDysfDMJFxkeZ8",
  authDomain: "errordiary-eab7f.firebaseapp.com",
  databaseURL: "https://errordiary-eab7f.firebaseio.com",
  projectId: "errordiary-eab7f",
  storageBucket: "errordiary-eab7f.appspot.com",
  messagingSenderId: "419702483824"
};

firebase.initializeApp(firebaseConfig);

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, config),
  reduxFirestore(firebase)
)(createStore);

const reducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

const initialState = {};
const store = createStoreWithFirebase(reducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
