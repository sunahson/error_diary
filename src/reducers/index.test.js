import reducer from'./index.js';
import { CHANGE_VALUE, REMOVE_VALUE, RESET_VALUE, SHOW_ERROR, REMOVE_ERROR } from '../constants/ActionTypes';

describe('postData reducer', () => {
  it('should return the initial state', () => {
    expect(reducer.postData(undefined, {})).toEqual(
      {
        title: '',
        content: [],
        beforeData: [],
        solution: '',
        afterData: []
      }
    );
  });

  it('should handle CHANGE_VALUE title', () => {
    expect(
      reducer.postData([], {
        type: CHANGE_VALUE,
        payload: 'title',
        value: 'GET http://localhost:8080/post/bundle.js net::ERR_ABORTED'
      })
    ).toEqual(
      {
        title: 'GET http://localhost:8080/post/bundle.js net::ERR_ABORTED'
      }
    );
  });

  it('should handle CHANGE_VALUE contentTitle', () => {
    expect(
      reducer.postData({
        content: []
      }, {
        type: CHANGE_VALUE,
        payload: 'contentTitle',
        value: 'GET http://localhost:8080/post/bundle.js net::ERR_ABORTED'
      })
    ).toEqual(
      {
        content: ['GET http://localhost:8080/post/bundle.js net::ERR_ABORTED']
      }
    );
  });

  it('should handle CHANGE_VALUE contentContent', () => {
    expect(
      reducer.postData({
        content: ['GET http://localhost:8080/post/bundle.js net::ERR_ABORTED']
      }, {
        type: CHANGE_VALUE,
        payload: 'contentContent',
        value: '없음'
      })
    ).toEqual(
      {
        content: ['GET http://localhost:8080/post/bundle.js net::ERR_ABORTED', '없음']
      }
    );
  });

  it('should handle CHANGE_VALUE beforeDataFileName', () => {
    expect(
      reducer.postData({
        beforeData: []
      }, {
        type: CHANGE_VALUE,
        payload: 'beforeDataFileName',
        value: 'public/index.html',
        id: 0
      })
    ).toEqual(
      {
        beforeData: [['public/index.html']]
      }
    );
  });

  it('should handle CHANGE_VALUE beforeDataContent', () => {
    expect(
      reducer.postData({
        beforeData: [['public/index.html']]
      }, {
        type: CHANGE_VALUE,
        payload: 'beforeDataContent',
        value: `<!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                    <title>React App</title>
                  </head>
                  <body>
                    <noscript>
                      You need to enable JavaScript to run this app.
                    </noscript>
                    <div id="root"></div>
                    <script src="bundle.js"></script>
                  </body>
                </html>`,
        id: 0
      })
    ).toEqual(
      {
        beforeData: [['public/index.html', `<!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                    <title>React App</title>
                  </head>
                  <body>
                    <noscript>
                      You need to enable JavaScript to run this app.
                    </noscript>
                    <div id="root"></div>
                    <script src="bundle.js"></script>
                  </body>
                </html>`,]]
      }
    );
  });

  it('should handle CHANGE_VALUE solution', () => {
    expect(
      reducer.postData([], {
        type: CHANGE_VALUE,
        payload: 'solution',
        value: 'bundle.js앞에 / 추가하기'
      })
    ).toEqual(
      {
        solution: 'bundle.js앞에 / 추가하기'
      }
    );
  });

  it('should handle CHANGE_VALUE afterDataFileName', () => {
    expect(
      reducer.postData({
        afterData: []
      }, {
        type: CHANGE_VALUE,
        payload: 'afterDataFileName',
        value: 'public/index.html',
        id: 0
      })
    ).toEqual(
      {
        afterData: [['public/index.html']]
      }
    );
  });

  it('should handle CHANGE_VALUE afterDataContent', () => {
    expect(
      reducer.postData({
        afterData: [['public/index.html']]
      }, {
        type: CHANGE_VALUE,
        payload: 'afterDataContent',
        value: `<!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                    <title>React App</title>
                  </head>
                  <body>
                    <noscript>
                      You need to enable JavaScript to run this app.
                    </noscript>
                    <div id="root"></div>
                    <script src="bundle.js"></script>
                  </body>
                </html>`,
        id: 0
      })
    ).toEqual(
      {
        afterData: [['public/index.html', `<!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                    <title>React App</title>
                  </head>
                  <body>
                    <noscript>
                      You need to enable JavaScript to run this app.
                    </noscript>
                    <div id="root"></div>
                    <script src="bundle.js"></script>
                  </body>
                </html>`]]
      }
    );
  });

  it('should handle REMOVE_VALUE', () => {
    expect(
      reducer.postData({
        beforeData: [['filename0', 'code0'], ['filename1', 'code1'], ['filename2', 'code2']],
        afterData: [['filename0', 'code0'], ['filename1', 'code1'], ['filename2', 'code2']]
      }, {
        type: REMOVE_VALUE,
        id: 1
      })
    ).toEqual(
      {
        beforeData: [['filename0', 'code0'], ['', ''], ['filename2', 'code2']],
        afterData: [['filename0', 'code0'], ['', ''], ['filename2', 'code2']]
      }
    );
  });

  it('should handle RESET_VALUE', () => {
    expect(
      reducer.postData([], {
        type: RESET_VALUE
      })
    ).toEqual(
      {
        title: '',
        content: [],
        beforeData: [],
        afterData: [],
        solution: '' 
      }
    );
  });
});

describe('errorData reducer', () => {
  it('should return the initial state', () => {
    expect(reducer.errorData(undefined, {})).toEqual(
      {
        error: false,
        message: ''
      }
    );
  });

  it('should handle SHOW_ERROR title', () => {
    expect(
      reducer.errorData([], {
        type: SHOW_ERROR,
        payload: 'title'
      })
    ).toEqual(
      {
        error: 'title',
        message: ''
      }
    );
  });

  it('should handle SHOW_ERROR contentTitle', () => {
    expect(
      reducer.errorData([], {
        type: SHOW_ERROR,
        payload: 'contentTitle'
      })
    ).toEqual(
      {
        error: 'contentTitle',
        message: ''
      }
    );
  });

  it('should handle SHOW_ERROR contentContent', () => {
    expect(
      reducer.errorData([], {
        type: SHOW_ERROR,
        payload: 'contentContent'
      })
    ).toEqual(
      {
        error: 'contentContent',
        message: ''
      }
    );
  });

  it('should handle SHOW_ERROR beforeDataZero', () => {
    expect(
      reducer.errorData([], {
        type: SHOW_ERROR,
        payload: 'beforeDataZero'
      })
    ).toEqual(
      {
        error: 'beforeDataZero',
        message: '추가 버튼을 눌러 파일 이름과 코드를 작성하세요.'
      }
    );
  });

  it('should handle SHOW_ERROR beforeAfterData', () => {
    expect(
      reducer.errorData([], {
        type: SHOW_ERROR,
        payload: 'beforeAfterData'
      })
    ).toEqual(
      {
        error: 'beforeAfterData',
        message: '파일 이름과 코드를 모두 작성했는지 확인해주세요.'
      }
    );
  });

  it('should handle SHOW_ERROR solution', () => {
    expect(
      reducer.errorData([], {
        type: SHOW_ERROR,
        payload: 'solution'
      })
    ).toEqual(
      {
        error: 'solution',
        message: ''
      }
    );
  });

  it('should handle REMOVE_ERROR', () => {
    expect(
      reducer.errorData([], {
        type: REMOVE_ERROR
      })
    ).toEqual(
      {
        error: '',
        message: ''
      }
    );
  });
});
