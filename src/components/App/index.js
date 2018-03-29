import React from 'react';
import './style.less';
import 'bootstrap/dist/css/bootstrap.css';
import Main from '../Main/';
import Create from '../Create/';
import Post from '../Post/';
import Update from '../Update/';
import { Switch, Route } from 'react-router';
import { formattingDate } from '../../utils.js';
import 'lodash';

export default class App extends React.Component {
  renderMainPage() {
    return <Main postList={this.props.postList} />;
  }

  renderCreatePostPage() {
    return (
      <Create onChangeValue={this.props.onChangeValue} onRemoveValue={this.props.onRemoveValue} onSaveData={this.onSaveData.bind(this)} />
    );
  }

  renderPostViewPage() {
    const clientPostKey = this.props.location.pathname.split("/")[2];
    const data = _.find(this.props.postList, { 'clientPostKey': clientPostKey });

    if (data) {
      return (
        <Post data={data} onRemoveData={this.onRemoveData.bind(this)} />
      );
    } else {
      return null;
    }
  }

  renderPostUpdatePage() {
    const clientPostKey = this.props.location.pathname.split("/")[2];
    const data = _.find(this.props.postList, { 'clientPostKey': clientPostKey });

    if (data) {
      return (
        <Update data={data} onChangeValue={this.props.onChangeValue} onRemoveValue={this.props.onRemoveValue} onUpdateData={this.onUpdateData.bind(this)} />
      );
    } else {
      return null;
    }
  }

  onSaveData(clientPostKey) {
    let dateResult = formattingDate(new Date());
    const postData = this.props.postData

    this.props.firebase.push('postList', {
      clientPostKey: clientPostKey,
      DBPostKey: '',
      title: postData.title,
      content: postData.content,
      beforeData: postData.beforeData.filter((n) => { return (n[0] !== '' && n[1] !== '' ) }),
      afterData: postData.afterData.filter((n) => { return (n[0] !== '' && n[1] !== '' ) }),
      solution: postData.solution,
      date: dateResult
    });

    this.props.firebase.update(`postList/${this.props.postList && Object.keys(this.props.postList)[Object.keys(this.props.postList).length - 1]}`, {
      DBPostKey: this.props.postList && Object.keys(this.props.postList)[Object.keys(this.props.postList).length - 1]
    });

    this.props.onResetValue();
  }

  onUpdateData() {
    const clientPostKey = this.props.location.pathname.split("/")[2];
    const data = _.find(this.props.postList, { 'clientPostKey': clientPostKey });
    const DBPostKey = data.DBPostKey;
    const lastKey = Object.keys(this.props.postList)[Object.keys(this.props.postList).length - 1];
    const postData = this.props.postData;

    if (postData.content.length !== 0) {
      for (let i = 0; i < 2; i++) {
        if (!(postData.content[i])) {
          postData.content[i] = data.content[i];
        }
      }
    } else {
      postData.content = data.content
    }

    if (postData.beforeData.length !== 0) {
      for (let i = 0; i < data.beforeData.length; i++) {
        for (let j = 0; j < 2; j++) {
          if (postData.beforeData[i] === undefined) {
            postData.beforeData[i] = new Array();
            postData.beforeData[i][j] = data.beforeData[i][j];
          } else if ((postData.beforeData[i][j]) !== '' && !(postData.beforeData[i][j])) {
            postData.beforeData[i][j] = data.beforeData[i][j];
          }
        }
      }
    } else {
      postData.beforeData = data.beforeData;
    }

    if (postData.afterData.length !== 0) {
      for (let i = 0; i < data.afterData.length; i++) {
        for (let j = 0; j < 2; j++) {
          if (postData.afterData[i] === undefined) {
            postData.afterData[i] = new Array();
            postData.afterData[i][j] = data.afterData[i][j];
          } else if ((postData.beforeData[i][j]) !== '' && !(postData.afterData[i][j])) {
            postData.afterData[i][j] = data.afterData[i][j];
          }
        }
      }
    } else {
      postData.afterData = data.afterData;
    }

    const updateDataStorage = {
      title: postData.title? postData.title : data.title,
      content: postData.content,
      beforeData: postData.beforeData.filter((n) => { return (n[0] !== '' && n[1] !== '' ) }),
      afterData: postData.afterData.filter((n) => { return (n[0] !== '' && n[1] !== '' ) }),
      solution: postData.solution? postData.solution : data.solution,
    };

    this.props.firebase.update(`postList/${DBPostKey === ''? lastKey : DBPostKey}`, updateDataStorage);

    this.props.onResetValue();
  }

  onRemoveData() {
    const clientPostKey = this.props.location.pathname.split("/")[2];
    const data = _.find(this.props.postList, { 'clientPostKey': clientPostKey });
    const DBPostKey = data.DBPostKey;
    const lastKey = Object.keys(this.props.postList)[Object.keys(this.props.postList).length - 1];

    this.props.firebase.remove(`postList/${DBPostKey === ''? lastKey : DBPostKey}`);
  }

  render(){
    return (
      <div className="page">
        <div className="header">
          <h1 className="header-title">우리는 버그가 아니다;</h1>
          <p className="header-subtitle">버그 탈출을 위한 다이어리</p>
        </div>
        <Switch>
          <Route exact path="/" render={this.renderMainPage.bind(this)} />
          <Route path="/create" render={this.renderCreatePostPage.bind(this)} />
          <Route path="/post/:postId" render={this.renderPostViewPage.bind(this)} />
          <Route path="/update/:postId" render={this.renderPostUpdatePage.bind(this)} />
        </Switch>
      </div>
    );
  }
}
