import mutations from '../../src/store/mutations';
import users from '../fixtures/users';

describe('mutations', () => {
  test('should add initial users to store', () => {
    const state = {
      users: null,
    };

    mutations.FETCH_USERS (state, users);
    expect(state.users).toEqual(users);
  });

  test('should add new user to store', () => {
    const state = {
      users,
    };

    const newUser = {
      name: 'Test 3',
      email: 'test3@example.com',
      phone: '123456',
      gender: 'male',
      services: 'internet',
      country: 'Hungary',
      newsletter: true
    };

    const newState = [
      ...users,
      newUser
    ]

    mutations.ADD_USER (state, newUser);
    expect(state.users).toEqual(users);
  });

  test('should edit user', () => {
    const state = {
      users,
    };

    const editedUser = {
      id: 1,
      name: 'New Name'
    };

    mutations.EDIT_USER (state, editedUser);
    expect(state.users[0].name).toBe('New Name');
  });

  test('should delete user', () => {
    const state = {
      users,
    };

    mutations.DELETE_USER (state, 1);
    expect(state.users[0].id).not.toBe(1);
  });

  test('add new user error', () => {
    const state = {
      addNewUserError: false
    };

    mutations.ADD_NEW_USER_ERROR (state, 'Error message');
    expect(state.addNewUserError).toBe('Error message');
  })
});
