import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/';
import { createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { firebaseReducer, reactReduxFirebase } from 'react-redux-firebase';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

const config = {
  userProfile: 'users',
  enableLogging: false,
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
  reactReduxFirebase(firebase, config)
)(createStore);

const reducer = combineReducers({
  firebase: firebaseReducer
});

const initialState = {};
const store = createStoreWithFirebase(reducer, initialState);

const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'));
