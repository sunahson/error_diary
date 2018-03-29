import react from 'react';
import App from '../components/App/';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router';
import { changeValue, removeValue, resetValue, showErrorSign, removeErrorSign } from '../actions';
import { formattingDate } from '../utils.js';
import 'lodash';

const mapStateToProps = (state) => {
  return {
    postList: state.firebase.data.postList,
    postData: state.postData,
    errorData: state.errorData
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onChangeValue: (mode, value, id) => {
      dispatch(changeValue(mode, value, id));
    },
    onRemoveValue: (id) => {
      dispatch(removeValue(id));
    },
    onResetValue: () => {
      dispatch(resetValue());
    },
    onSaveData: (postData, postList, clientPostKey) => {
      props.firebase.push('postList', {
        clientPostKey: clientPostKey,
        DBPostKey: '',
        title: postData.title,
        content: postData.content,
        beforeData: postData.beforeData.filter((data) => { return (data[0] !== '' && data[1] !== '' ) }),
        solution: postData.solution,
        afterData: postData.afterData.filter((data) => { return (data[0] !== '' && data[1] !== '' ) }),
        date: formattingDate(new Date())
      });

      props.firebase.update(`postList/${postList && Object.keys(postList)[Object.keys(postList).length - 1]}`, {
        DBPostKey: postList && Object.keys(postList)[Object.keys(postList).length - 1]
      });
    },
    onUpdateData: (postData, postList) => {
      const clientPostKey = props.location.pathname.split("/")[2];
      const data = _.find(postList, { 'clientPostKey': clientPostKey });
      const DBPostKey = data.DBPostKey;
      const lastKey = Object.keys(postList)[Object.keys(postList).length - 1];

      const updateDataStorage = {
        title: postData.title,
        content: postData.content,
        beforeData: postData.beforeData.filter((data) => { return (data[0] !== '' && data[1] !== '' ) }),
        solution: postData.solution,
        afterData: postData.afterData.filter((data) => { return (data[0] !== '' && data[1] !== '' ) }),
      };

      props.firebase.update(`postList/${DBPostKey === ''? lastKey : DBPostKey}`, updateDataStorage);
    },
    onRemoveData: (postList) => {
      const clientPostKey = props.location.pathname.split("/")[2];
      const data = _.find(postList, { 'clientPostKey': clientPostKey });
      const DBPostKey = data.DBPostKey;
      const lastKey = Object.keys(postList)[Object.keys(postList).length - 1];

      props.firebase.remove(`postList/${DBPostKey === ''? lastKey : DBPostKey}`);
    },
    onShowErrorSign: (mode) => {
      dispatch(showErrorSign(mode));
    },
    onRemoveErrorSign: () => {
      dispatch(removeErrorSign());
    },
    onSelectPost: (postList) => {
      const clientPostKey = props.location.pathname.split("/")[2];
      const data = _.find(postList, { 'clientPostKey': clientPostKey });

      return data;
    }
  };
};

export default compose(
  firebaseConnect((props) => {
    return [
      'postList'
    ]
  }),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App);
