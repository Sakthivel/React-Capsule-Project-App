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
import UsersList from '../components/UsersList';

configure({
  adapter: new Adapter(),
});

describe('<UsersList />', () => {
  it('should render <UsersList /> component with loading user text', () => {
    const Users = shallow(<UsersList />);
    expect(Users.find('p')).to.have.length(1);
    expect(Users.find('p').text()).to.be.a('string');
    expect(Users.find('p').text()).to.equal('Loading User...');
  });
});
