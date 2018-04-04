import React from 'react';
import './style.less';
import 'bootstrap/dist/css/bootstrap.css';
import Main from '../Main/';
import Create from '../Create/';
import Post from '../Post/';
import Update from '../Update/';
import { Switch, Route } from 'react-router';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: ''
    }
  }

  renderMainPage() {
    let postList = _.pickBy(this.props.postList, (value, key) => {
      return value.title.toLowerCase().includes(this.state.searchText.toLowerCase());
    });

    return <Main postList={postList} onSearchPost={this.onSearchPost.bind(this)} onResetValue={this.props.onResetValue} />;
  }

  renderCreatePostPage() {
    return (
      <Create onChangeValue={this.props.onChangeValue} onRemoveValue={this.props.onRemoveValue} onSaveData={this.onSaveData.bind(this)} errorData={this.props.errorData} onRemoveErrorSign={this.props.onRemoveErrorSign} />
    );
  }

  renderPostViewPage() {
    const data = this.props.onSelectPost(this.props.postList);

    if (data) {
      return (
        <Post data={data} onRemoveData={this.onRemoveData.bind(this)} />
      );
    } else {
      return null;
    }
  }

  renderPostUpdatePage() {
    const data = this.props.onSelectPost(this.props.postList);

    if (data) {
      return (
        <Update data={data} onChangeValue={this.props.onChangeValue} onRemoveValue={this.props.onRemoveValue} onUpdateData={this.onUpdateData.bind(this)} errorData={this.props.errorData} onRemoveErrorSign={this.props.onRemoveErrorSign} />
      );
    } else {
      return null;
    }
  }

  onSaveData(clientPostKey) {
    const validateData = this.validateData(this.props.postData);

    if (validateData) {
      return;
    }

    this.props.onSaveData(this.props.postData, this.props.postList, clientPostKey);
    this.props.history.push(`post/${clientPostKey}`);
    this.props.onResetValue();
  }

  onUpdateData() {
    const validateData = this.validateData(this.props.postData);

    if (validateData) {
      return;
    }

    this.props.onUpdateData(this.props.postData, this.props.postList);
    this.props.history.goBack();
    this.props.onResetValue();
  }

  validateData(postData) {
    let error = '';

    if (!postData.title) {
      this.props.onShowErrorSign('title');
      error = 'title';

      return error;
    } else if (!postData.content[0]) {
      this.props.onShowErrorSign('contentTitle');
      error = 'contentTitle';

      return error;
    } else if (!postData.content[1]) {
      this.props.onShowErrorSign('contentContent');
      error = 'contentContent';

      return error;
    }

    if (postData.beforeData.length === 0) {
      this.props.onShowErrorSign('beforeDataZero');
      error = 'beforeDataZero';

      return error;
    } else if (postData.beforeData.length !== 0) {
      var beforeDataFileNameCount = 0;
      var beforeDataContentCount = 0;

      postData.beforeData.map((data, index) => {
        if (data[0]) {
          beforeDataFileNameCount++;
        }

        if (data[1]) {
          beforeDataContentCount++;
        }
      });

      if ((beforeDataFileNameCount === 0 || beforeDataContentCount === 0) || (beforeDataFileNameCount !== beforeDataContentCount)) {
        this.props.onShowErrorSign('beforeAfterData');
        error = 'beforeAfterData';

        return error;
      }
    }

    if (!postData.solution) {
      this.props.onShowErrorSign('solution');
      error = 'solution';

      return error;
    }

    if (postData.afterData.length === 0) {
      this.props.onShowErrorSign('beforeAfterData');
      error = 'beforeAfterData';

      return error;
    } else if (postData.afterData.length !== 0) {
      let afterDataFileNameCount = 0;
      let afterDataContentCount = 0;

      postData.afterData.map((data, index) => {
        if (data[0]) {
          afterDataFileNameCount++;
        }

        if (data[1]) {
          afterDataContentCount++;
        }
      });

      if ((afterDataFileNameCount === 0 || afterDataContentCount === 0) || (afterDataFileNameCount !== afterDataContentCount)) {
        this.props.onShowErrorSign('beforeAfterData');
        error = 'beforeAfterData';

        return error;
      } else if ((beforeDataFileNameCount !== afterDataFileNameCount) || (beforeDataContentCount !== afterDataContentCount)) {
        this.props.onShowErrorSign('beforeAfterData');
        error = 'beforeAfterData';

        return error;
      }
    }
  }

  onRemoveData() {
    this.props.onRemoveData(this.props.postList);
  }

  onSearchPost(searchText) {
    this.setState({
      searchText
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
          <Route path="/update/:postId" render={this.renderPostUpdatePage.bind(this)} />
        </Switch>
      </div>
    );
  }
}
