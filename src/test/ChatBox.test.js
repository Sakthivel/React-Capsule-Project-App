import React from 'react';
import {
  configure,
  shallow,
  mount,
  render,
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  expect,
} from 'chai';
import ChatBox from '../components/ChatBox';

configure({
  adapter: new Adapter(),
});

describe('<ChatBox />', () => {
  it('should render <ChatBox /> component window', () => {
    const chatWindow = shallow(<ChatBox />);
    expect(chatWindow.find('div')).to.have.length(1);
    expect(chatWindow.find('div').text()).to.be.a('string');
    expect(chatWindow.find('div').text()).to.equal('Loading message...');
  });
});
