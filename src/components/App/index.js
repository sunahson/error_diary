import React from 'react';
import './style.less';
import 'bootstrap/dist/css/bootstrap.css';
import Main from '../Main/';
import Create from '../Create/';
import { Switch, Route } from 'react-router';

export default class App extends React.Component {
  renderMainPage() {
    return <Main postList={this.props.postList} />;
  }

  renderCreatePostPage() {
    return (
      <Create />
    );
  }

  render(){
    return (
      <div className="page">
        <div className="header">
          <h1 className="header-title">우리는 버그가 아니다;</h1>
          <p className="header-subtitle">버그 탈출을 위한 다이어리</p>
        </div>
        <Switch>
          <Route exact path="/" render={this.renderMainPage.bind(this)}/>
          <Route path="/create" render={this.renderCreatePostPage.bind(this)} />
        </Switch>
      </div>
    );
  }
}
