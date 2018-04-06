import React from 'react';
import './style.less';
import { Link } from 'react-router-dom';
import Highlight from 'react-highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

export default class Post extends React.Component {
  render(){
    return (
      <div className="row post-container">
        <div className="col-12 post">
          <h3 className="title">
            {
              this.props.data.title && this.props.data.title.split('\n').map((data, index) => {
                return (
                  <p key={index}>{data}</p>
                );
              })
            }
          </h3>
          <hr className="hr" />
          <p className="date">{this.props.data.date && this.props.data.date}</p>
          <div className="error-container">
            <p className="error-title">1. 발생한 에러</p>
            <div className="error-content">
              <div className="error-content-container">
                <p className="sub-title">1) 에러 내용</p>
                <div className="sub-content">
                  {
                    this.props.data.content[0] && this.props.data.content[0].split('\n').map((data, index) => {
                      return (
                        <p key={index}>{data}</p>
                      );
                    })
                  }
                </div>
              </div>
              <div className="callstack-container">
                <p className="sub-title">2) callstack</p>
                <div className="sub-content">
                  {
                    this.props.data.content[1] && this.props.data.content[1].split('\n').map((data, index) => {
                      return (
                        <p key={index}>{data}</p>
                      );
                    })
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="before-container">
            <p className="before-title">2. 변경 전 코드</p>
            <div className="before-contents">
              {
                this.props.data.beforeData && this.props.data.beforeData.map((data, index) => {
                  const dataSplit = data[0].split('.');
                  const lang = dataSplit[dataSplit.length - 1];
                    if (lang === 'js') {
                      return (
                        <div key={index} className="before-content">
                          <p className="sub-title">{data[0]}</p>
                          <Highlight className='javascript'>
                            <p className="sub-content">{data[1]}</p>
                          </Highlight>
                        </div>
                      );
                    } else {
                      return (
                        <div key={index} className="before-content">
                          <p className="sub-title">{data[0]}</p>
                          <Highlight className={lang}>
                            <p className="sub-content">{data[1]}</p>
                          </Highlight>
                        </div>
                      );
                    }
                })
              }
            </div>
          </div>
          <div className="solution-container">
            <p className="solution-title">3. 해결 방법</p>
            <div className="solution-content">
              {
                this.props.data.solution && this.props.data.solution.split('\n').map((data, index) => {
                  return (
                    <p key={index}>{data}</p>
                  );
                })
              }
            </div>
          </div>
          <div className="after-container">
            <p className="after-title">4. 변경 후 코드</p>
            <div className="after-contents">
              {
                this.props.data.afterData && this.props.data.afterData.map((data, index) => {
                  const dataSplit = data[0].split('.');
                  const lang = dataSplit[dataSplit.length - 1];

                  if (lang === 'js') {
                    return (
                      <div key={index} className="after-content">
                        <p className="sub-title">{data[0]}</p>
                        <Highlight className='javascript'>
                          <p className="sub-content">{data[1]}</p>
                        </Highlight>
                      </div>
                    );
                  } else {
                    return (
                      <div key={index} className="after-content">
                        <p className="sub-title">{data[0]}</p>
                        <Highlight className={lang}>
                          <p className="sub-content">{data[1]}</p>
                        </Highlight>
                      </div>
                    );
                  }
                })
              }
            </div>
          </div>
          <div className="button-container">
            <Link to="/" className="link">
              <button className="button default" onClick={() => this.props.onRemoveData()}>삭제하기</button>
            </Link>
            <div className="button-sub-container">
              <Link to="/" className="link">
                <button className="button default">목록보기</button>
              </Link>
              <Link to={`/update/${this.props.data.clientPostKey && this.props.data.clientPostKey}`} className="link">
                <button className="button default">수정하기</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
