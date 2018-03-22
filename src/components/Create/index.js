import React from 'react';
import './style.less';

export default class Create extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputFieldCount: 1,
      beforeInput: [],
      afterInput: []
    };
  }

  addInputField() {
    let newBeforeInput = this.state.beforeInput.slice();
    let newAfterInput = this.state.afterInput.slice();

    this.setState({
      inputFieldCount: this.state.inputFieldCount + 1
    });

    for (let i = this.state.inputFieldCount; i < this.state.inputFieldCount + 1; i++) {
      newBeforeInput.push(
        <div key={i} index={i}>
          <label htmlFor="file_name"></label>
          <input type="text" id="file_name" placeholder={i} />
          <label htmlFor="file_content"></label>
          <input type="text" id="file_content" />
          <button onClick={() => this.removeInputField(i)}>삭제</button>
        </div>
      );

      newAfterInput.push(
        <div key={i} index={i}>
          <label htmlFor="file_name"></label>
          <input type="text" id="file_name" placeholder={i} />
          <label htmlFor="file_content"></label>
          <input type="text" id="file_content" />
        </div>
      );
    }

    this.setState({
      beforeInput: newBeforeInput,
      afterInput: newAfterInput
    });
  }

  removeInputField(target) {
    let newBeforeInput = this.state.beforeInput.slice();
    let newAfterInput = this.state.afterInput.slice();

    for (let i = 0; i < newBeforeInput.length; i++) {
      if (newBeforeInput[i].key === target.toString() && newAfterInput[i].key === target.toString()) {
        newBeforeInput.splice(i, 1);
        newAfterInput.splice(i, 1);
      }
    }

    this.setState({
      beforeInput: newBeforeInput,
      afterInput: newAfterInput
    });
  }

  render(){
    return (
      <div>
        <label htmlFor="title">제목</label>
        <input type="text" id="title" />
        <div>
          <p>1. 발생한 에러</p>
          <div>
            <label htmlFor="error_content">1) 에러 내용</label>
            <input type="text" id="error_content" />
            <label htmlFor="callstack">2) callstack</label>
            <input type="text" id="callstack" />
          </div>
        </div>
        <div>
          <p>2. 변경 전 코드</p>
          <div>
            <button onClick={() => this.addInputField()}>추가</button>
            <div>
              <label htmlFor="file_name"></label>
              <input type="text" id="file_name" placeholder="파일 이름을 적으세요" />
              <label htmlFor="file_content"></label>
              <input type="text" id="file_content" />
            </div>
            {this.state.beforeInput}
          </div>
        </div>
        <div>
          <p>3. 해결 방법</p>
          <div>
            <label htmlFor="solution"></label>
            <input type="text" id="solution" />
          </div>
        </div>
        <div>
          <p>4. 변경 후 코드</p>
          <div>
            <div>
              <label htmlFor="file_name"></label>
              <input type="text" id="file_name" placeholder="파일 이름을 적으세요" />
              <label htmlFor="file_content"></label>
              <input type="text" id="file_content" />
            </div>
            {this.state.afterInput}
          </div>
        </div>
        <button>저장하기</button>
        <button>취소하기</button>
      </div>
    );
  }
}
