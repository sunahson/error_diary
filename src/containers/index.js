import react from 'react';
import App from '../components/App/';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

export default compose(
  firestoreConnect([{ collection: 'postList'}]),
  connect((state, props) => ({
    postList: state.firestore.ordered.postList
  }))
)(App);
