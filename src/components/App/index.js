import React from 'react';
import './style.less';
import 'bootstrap/dist/css/bootstrap.css';
import Main from '../Main/';
import Create from '../Create/';
import Post from '../Post/';
import { Switch, Route } from 'react-router';
import { formattingDate } from '../../utils.js';
import 'lodash';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: this.props.firebase.database().ref().push().key,
      title: '',
      content: [],
      beforeData: [],
      afterData: [],
      solution: ''
    }
  }

  renderMainPage() {
    return <Main postList={this.props.postList} />;
  }

  renderCreatePostPage() {
    return (
      <Create postId={this.state.key} changeValue={this.changeValue.bind(this)} resetValue={this.resetValue.bind(this)} saveData={this.onSaveData.bind(this)} />
    );
  }

  renderPostViewPage() {
    const key = this.props.location.pathname.split("/")[2];
    const data = _.find(this.props.postList, { 'key': key });

    return (
      <Post data={data} />
    );
  }

  changeValue(mode, value, id) {
    if (mode === 'title') {
      this.setState({
        title: value
      });
    } else if (mode.includes('content')) {
      let newContent = this.state.content.slice();

      mode === 'content0'? newContent[0] = value : newContent[1] = value;

      this.setState({
        content: newContent
      });
    } else if (mode.includes('beforeData')) {
      let newBeforeData = this.state.beforeData.slice();

      if (newBeforeData[id] === undefined) {
        newBeforeData[id] = new Array();
      }

      mode === 'beforeData0'? newBeforeData[id][0] = value : newBeforeData[id][1] = value;

      this.setState({
        beforeData: newBeforeData
      });
    } else if (mode.includes('afterData')) {
      let newAfterData = this.state.afterData.slice();

      if (newAfterData[id] === undefined) {
        newAfterData[id] = new Array();
      }

      mode === 'afterData0'? newAfterData[id][0] = value : newAfterData[id][1] = value;

      this.setState({
        afterData: newAfterData
      });
    } else if (mode === 'solution') {
      this.setState({
        solution: value
      });
    }
  }

  resetValue(target) {
    let newBeforeData = this.state.beforeData.slice();
    let newAfterData = this.state.afterData.slice();

    newBeforeData[target] = null;
    newAfterData[target] = null;

    this.setState({
      beforeData: newBeforeData,
      afterData: newAfterData
    });
  }

  onSaveData() {
    let newBeforeData = [];
    let newAfterData = [];
    let dateResult = formattingDate(new Date());

    newBeforeData = this.state.beforeData.slice().filter((data) => { return data !== null });
    newAfterData = this.state.afterData.slice().filter((data) => { return data !== null });

    this.props.firebase.push('postList', {
      key: this.state.key,
      title: this.state.title,
      content: this.state.content,
      beforeData: newBeforeData,
      afterData: newAfterData,
      solution: this.state.solution,
      date: dateResult
    });
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
        </Switch>
      </div>
    );
  }
}
