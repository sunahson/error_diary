import React from 'react';
import './style.less';
import 'bootstrap/dist/css/bootstrap.css';

export default class App extends React.Component {
  render(){
    return (
      <div className="page">
        <div className="row">
          <div className="col-12 header">
            <h1 className="header-title">나는 버그가 아니다;</h1>
            <p className="header-subtitle">버그 탈출을 위한 다이어리</p>
          </div>
        </div>
        <div className="content">
          <div className="row">
            <ul className="offset-2 col-8 postList">
              <li className="row postList-header">
                <p className="col-8 postList-title">제목</p>
                <p className="col-4 postList-date">날짜</p>
              </li>
              <li className="postList-content">
                {
                  this.props.postList &&
                  Object.keys(this.props.postList[0]).map((data, index) => {
                    if (this.props.postList[0][data].date) {
                      return (
                        <div className="row post" key={index}>
                          <p className="col-8 post-title">{this.props.postList[0][data].title}</p>
                          <p className="col-4 post-date">{this.props.postList[0][data].date}</p>
                        </div>
                      );
                    }
                  })
                }
              </li>
            </ul>
          </div>
          <div className="row">
            <button className="offset-9 col-1 button default">글쓰기</button>
          </div>
          <div className="row">
            <p className="offset-2 col-8 footer-page">1 | 2 | 3 | 4 | 5 | ... | 15</p>
          </div>          
        </div>
      </div>
    );
  }
}
