import React from 'react';
import './style.less';
import { Link } from 'react-router-dom';

export default class Post extends React.Component {
  render(){
    return (
      <div>
        <h3>{this.props.data.title}</h3>
        <hr />
        <p>{this.props.data.date}</p>
        <div>
          <p>1. 발생한 에러</p>
          <div>
            <div>
              <p>1) 에러 내용</p>
              <p>{this.props.data.content[0]}</p>
            </div>
            <div>
              <p>2) callstack</p>
              <p>{this.props.data.content[1]}</p>
            </div>
          </div>
        </div>
        <div>
          <p>2. 변경 전 코드</p>
          <div>
            {
              this.props.data.beforeData.map((data, index) => {
                return (
                  <div>
                    <p>{data[0]}</p>
                    <p>{data[1]}</p>
                  </div>
                );
              })
            }
          </div>
        </div>
        <div>
          <p>3. 해결 방법</p>
          <div>
            <p>{this.props.data.solution}</p>
          </div>
        </div>
        <div>
          <p>4. 변경 후 코드</p>
          <div>
            {
              this.props.data.afterData.map((data, index) => {
                return (
                  <div>
                    <p>{data[0]}</p>
                    <p>{data[1]}</p>
                  </div>
                );
              })
            }
          </div>
        </div>
        <div>
          <button>삭제하기</button>
          <Link to="/">
            <button>목록보기</button>
          </Link>
          <button>수정하기</button>
        </div>
      </div>
    );
  }
}
