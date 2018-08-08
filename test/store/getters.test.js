import getters from '../../src/store/getters';
import users from '../fixtures/users';

describe('getters', () => {
  test('should return users', () => {
    const state = {
      users
    }

    expect(getters.users(state)).toEqual(users);
  }),

  test('should return error message', () => {
    const state = {
      addNewUserError: 'Error message'
    }

    expect(getters.error(state)).toBe('Error message');
  })
});
