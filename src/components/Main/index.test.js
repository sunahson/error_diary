import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import React from 'react';
import Main from './';
import Create from '../Create/';
import { MemoryRouter } from 'react-router-dom';

describe('<Main />', () => {
  it('should call onResetValue when rendered', () => {
    const mockOnResetValue = jest.fn();
    const wrapper = shallow(<Main onResetValue={mockOnResetValue} />);

    expect(wrapper).not.toBe(undefined);
    expect(mockOnResetValue).toHaveBeenCalled();
  });

  it('should render PostList', () => {
    const mockOnResetValue = jest.fn();
    const postList = {
      postKey0: {
        DBPostKey: 'DBPostKey',
        afterData: [['fileName0', 'code0'], ['fileName1', 'code1'], ['fileName2', 'code2']],
        beforeData: [['fileName0', 'code0'], ['fileName1', 'code1'], ['fileName2', 'code2']],
        clientPostKey: 'clientPostKey0',
        content: ['content', 'callback'],
        date: '2018.3.30',
        solution: 'solution',
        title: 'title0'
      },
      postKey1: {
        DBPostKey: 'DBPostKey',
        afterData: [['fileName0', 'code0'], ['fileName1', 'code1'], ['fileName2', 'code2']],
        beforeData: [['fileName0', 'code0'], ['fileName1', 'code1'], ['fileName2', 'code2']],
        clientPostKey: 'clientPostKey1',
        content: ['content', 'callback'],
        date: '2018.3.30',
        solution: 'solution',
        title: 'title1'
      },
      postKey2: {
        DBPostKey: 'DBPostKey',
        afterData: [['fileName0', 'code0'], ['fileName1', 'code1'], ['fileName2', 'code2']],
        beforeData: [['fileName0', 'code0'], ['fileName1', 'code1'], ['fileName2', 'code2']],
        clientPostKey: 'clientPostKey2',
        content: ['content', 'callback'],
        date: '2018.3.30',
        solution: 'solution',
        title: 'title2'
      }
    };
    const wrapper = mount(
      <MemoryRouter>
        <Main postList={postList} onResetValue={mockOnResetValue} />
      </MemoryRouter>
      );

    expect(wrapper).not.toBe(undefined);
    expect(mockOnResetValue).toHaveBeenCalled();
    expect(wrapper.find('.row .post').length).toEqual(3);
    expect(wrapper.find('.post-title').first().text()).toBe('title0');
  });

  it('should change search text', () => {
    const mockOnResetValue = jest.fn();
    const mockOnSearchPost = jest.fn();
    const wrapper = shallow(<Main onResetValue={mockOnResetValue} onSearchPost={mockOnSearchPost} />);

    expect(wrapper).not.toBe(undefined);
    expect(mockOnResetValue).toHaveBeenCalled();
    wrapper.find('#search').simulate('change', { target: { value: 'searchText' }});
    expect(mockOnSearchPost.mock.calls[0][0]).toBe('searchText');
  });

  it('should displays a link tag with the create post text', () => {
    const mockOnResetValue = jest.fn();
    const wrapper = mount(
      <MemoryRouter>
        <Main onResetValue={mockOnResetValue} />
      </MemoryRouter>
      );
    expect(wrapper.find({to: '/create'}).html()).toBe('<a class="link" href="/create"><button class="button default">글쓰기</button></a>');
  });

  it('should displays a link tag with the post title text', () => {
    const mockOnResetValue = jest.fn();
    const postList = {
      postKey0: {
        DBPostKey: 'DBPostKey',
        afterData: [['fileName0', 'code0'], ['fileName1', 'code1'], ['fileName2', 'code2']],
        beforeData: [['fileName0', 'code0'], ['fileName1', 'code1'], ['fileName2', 'code2']],
        clientPostKey: 'clientPostKey0',
        content: ['content', 'callback'],
        date: '2018.3.30',
        solution: 'solution',
        title: 'title0'
      },
      postKey1: {
        DBPostKey: 'DBPostKey',
        afterData: [['fileName0', 'code0'], ['fileName1', 'code1'], ['fileName2', 'code2']],
        beforeData: [['fileName0', 'code0'], ['fileName1', 'code1'], ['fileName2', 'code2']],
        clientPostKey: 'clientPostKey1',
        content: ['content', 'callback'],
        date: '2018.3.30',
        solution: 'solution',
        title: 'title1'
      }
    };
    const wrapper = mount(
      <MemoryRouter>
        <Main postList={postList} onResetValue={mockOnResetValue} />
      </MemoryRouter>
      );
    expect(wrapper.find({to: `/post/${postList.postKey0.clientPostKey}`}).html()).toBe('<a class="link" href="/post/clientPostKey0">title0</a>');
  });
});
