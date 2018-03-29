import React from 'react';
import './style.less';
import { Link } from 'react-router-dom';

export default class Main extends React.Component {
  render(){
    return (
      <div className="row content">
        <div className="offset-2 col-8">
          <ul className="postList">
            <li className="row postList-header">
              <p className="col-8 postList-title">제목</p>
              <p className="col-4 postList-date">날짜</p>
            </li>
            <li className="postList-content">
              {
                this.props.postList &&
                Object.keys(this.props.postList).map((data, index) => {
                  return (
                    <div className="row post" key={index}>
                      <p className="col-8 post-title">
                        <Link to={`/post/${this.props.postList[data].clientPostKey}`} className="link">
                          {this.props.postList[data].title}
                        </Link>
                      </p>
                      <p className="col-4 post-date">{this.props.postList[data].date}</p>
                    </div>
                  );
                })
              }
            </li>
          </ul>
        </div>
        <div className="offset-2 col-8 footer-content">
          <Link to="/create" className="link">
            <button className="button default">글쓰기</button>
          </Link>
          <p className="footer-page">
            <span>1 | 2 | 3 | 4 | 5 | ... | 15</span>
          </p>
        </div>
      </div>
    );
  }
}
