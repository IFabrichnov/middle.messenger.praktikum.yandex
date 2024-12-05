import { expect } from 'chai';
import UserGroup from './UserGroup.ts';

describe('UserGroup', () => {
  it('should create an instance without throwing errors', () => {
    expect(() => {
      new UserGroup({
        chatId: 1,
        currentUser: 1,
        users: [],
      });
    }).to.not.throw();
  });

  it('should return an UserGroup for the element property', () => {
    const { element } = new UserGroup({
      chatId: 1,
      currentUser: 1,
      users: [],
    });

    expect(element).to.be.instanceof(window.HTMLUListElement);
  });

  it('should render correct number of children based on users array', () => {
    const users = [
      {
        avatar: 'testAvatar1',
        login: 'testLogin1',
        id: 1,
        role: 'testRole1',
        email: 'testEmail1',
        display_name: 'testDisplayName1',
        first_name: 'testFirstName1',
        second_name: 'testSecondName1',
        phone: 'testPhone1',
      }, {
        avatar: 'testAvatar2',
        login: 'testLogin2',
        id: 2,
        role: 'testRole2',
        email: 'testEmail2',
        display_name: 'testDisplayName2',
        first_name: 'testFirstName2',
        second_name: 'testSecondName2',
        phone: 'testPhone2',
      },
    ];

    const userGroup = new UserGroup({
      chatId: 1,
      currentUser: 1,
      users,
    });

    expect(userGroup.children.UserGroupItems).to.have.lengthOf(users.length);
  });
});
