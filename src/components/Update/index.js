import React from 'react';
import { Link } from 'react-router-dom';

export default class Update extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputFieldCount: 0,
      beforeInput: [],
      afterInput: []
    };
  }

  componentWillMount() {
    let newBeforeInput = [];
    let newAfterInput = [];

    this.props.data.beforeData.map((data, index) => {
      newBeforeInput.push (
        <div key={index} className="before-content">
          <label htmlFor="file_name" className="label"></label>
          <input type="text" id="file_name" className="input" defaultValue={data[0]} onChange={(e) => this.props.onChangeValue('beforeDataFileName', e.target.value, index)} />
          <label htmlFor="file_content" className="label"></label>
          <textarea id="file_content" className="text-content" defaultValue={data[1]} onChange={(e) => this.props.onChangeValue('beforeDataContent', e.target.value, index)}></textarea>
          <button className="button remove" onClick={() => {
            this.removeInputField(index);
            this.props.onRemoveValue(index);
          }}>삭제</button>
        </div>
      );
    });

    this.props.data.afterData.map((data, index) => {
      newAfterInput.push (
        <div key={index} className="after-content">
          <label htmlFor="file_name" className="label"></label>
          <input type="text" id="file_name" className="input" defaultValue={data[0]} onChange={(e) => this.props.onChangeValue('afterDataFileName', e.target.value, index)} />
          <label htmlFor="file_content" className="label"></label>
          <textarea id="file_content" className="text-content" defaultValue={data[1]} onChange={(e) => this.props.onChangeValue('afterDataContent', e.target.value, index)}></textarea>
        </div>
      );
    });

    this.setState({
      inputFieldCount: newBeforeInput.length,
      beforeInput: newBeforeInput,
      afterInput: newAfterInput
    });

    this.props.onChangeValue('title', this.props.data.title);
    this.props.onChangeValue('contentTitle', this.props.data.content[0]);
    this.props.onChangeValue('contentContent', this.props.data.content[1]);

    this.props.data.beforeData.map((data, index) => {
      this.props.onChangeValue('beforeDataFileName', data[0], index);
      this.props.onChangeValue('beforeDataContent', data[1], index);
    });

    this.props.data.afterData.map((data, index) => {
      this.props.onChangeValue('afterDataFileName', data[0], index);
      this.props.onChangeValue('afterDataContent', data[1], index);
    });

    this.props.onChangeValue('solution', this.props.data.solution);
  }

  componentDidMount() {
    this.props.onRemoveErrorSign();
  }

  addInputField() {
    let newBeforeInput = this.state.beforeInput.slice();
    let newAfterInput = this.state.afterInput.slice();

    this.setState({
      inputFieldCount: this.state.inputFieldCount + 1
    });

    for (let i = this.state.inputFieldCount; i < this.state.inputFieldCount + 1; i++) {
      newBeforeInput.push(
        <div key={i} className="before-content">
          <label htmlFor="file_name" className="label"></label>
          <input type="text" id="file_name" className="input" placeholder="파일 이름을 입력하세요." onChange={(e) => this.props.onChangeValue('beforeDataFileName', e.target.value, i)} />
          <label htmlFor="file_content" className="label"></label>
          <textarea id="file_content" className="text-content" onChange={(e) => this.props.onChangeValue('beforeDataContent', e.target.value, i)}></textarea>
          <button className="button remove" onClick={() => {
            this.removeInputField(i);
            this.props.onRemoveValue(i);
          }}>삭제</button>
        </div>
      );

      newAfterInput.push(
        <div key={i} className="after-content">
          <label htmlFor="file_name" className="label"></label>
          <input type="text" id="file_name" className="input" placeholder="파일 이름을 입력하세요." onChange={(e) => this.props.onChangeValue('afterDataFileName', e.target.value, i)} />
          <label htmlFor="file_content" className="label"></label>
          <textarea id="file_content" className="text-content" onChange={(e) => this.props.onChangeValue('afterDataContent', e.target.value, i)}></textarea>
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
      <div className="row post-form">
        <div className="offset-1 col-10">
          <div className="row">
            <div className="col-2 title-label-container">
              <label htmlFor="title" className="label">제목</label>
            </div>
            <div className="col-10 title-input-container">
              <input type="text" id="title" className={`input ${this.props.errorData.error === 'title'? "error" : ""}`} defaultValue={this.props.data.title} onChange={(e) => this.props.onChangeValue('title', e.target.value)} />
            </div>
          </div>
          <div className="row">
            <div className="col-12 error-container">
              <p className="title">1. 발생한 에러</p>
              <div className="error-content">
                <label htmlFor="error_content" className="label">1) 에러 내용</label>
                <textarea id="error_content" className={`text-content ${this.props.errorData.error === 'contentTitle'? "error" : ""}`} defaultValue={this.props.data.content[0]} onChange={(e) => this.props.onChangeValue('contentTitle', e.target.value)}></textarea>
                <label htmlFor="callstack" className="label">2) callstack</label>
                <textarea id="callstack" className={`text-content ${this.props.errorData.error === 'contentContent'? "error" : ""}`} defaultValue={this.props.data.content[1]} onChange={(e) => this.props.onChangeValue('contentContent', e.target.value)}></textarea>
              </div>
            </div>
            <div className="col-12 before-container">
              <p className="title">2. 변경 전 코드</p>
              {
                this.props.errorData.error === 'beforeDataZero' &&
                <p className="error-message">{this.props.errorData.message}</p>
              }
              <div className="before-contents">
                <button className="button add" onClick={() => this.addInputField()}>추가</button>
                {
                  this.props.errorData.error === 'beforeData' &&
                  <p className="error-message">{this.props.errorData.message}</p>
                }
                {this.state.beforeInput}
              </div>
            </div>
            <div className="col-12 solution-container">
              <p className="title">3. 해결 방법</p>
              <div className="solution-content">
                <label htmlFor="solution" className="label"></label>
                <textarea id="solution" className={`text-content ${this.props.errorData.error === 'solution'? "error" : ""}`} defaultValue={this.props.data.solution} onChange={(e) => this.props.onChangeValue('solution', e.target.value)}></textarea>
              </div>
            </div>
            <div className="col-12 after-container">
              <p className="title">4. 변경 후 코드</p>
              <div className="after-contents">
                {
                  this.props.errorData.error === 'afterData' &&
                  <p className="error-message">{this.props.errorData.message}</p>
                }
                {this.state.afterInput}
              </div>
            </div>
            <div className="col-12 button-container">
              <Link to="/" className="link">
                <button className="button default">취소하기</button>
              </Link>
              <button className="button default" onClick={() => this.props.onUpdateData()}>수정하기</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
