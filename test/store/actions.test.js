import Vue from 'vue';
import Vuex from 'vuex';
import actions from '../../src/store/actions';

import users from '../fixtures/users';

Vue.use(Vuex);

describe('actions', () => {
  let store, setUsersMock, setErrorMock, addUserMock, deleteUserMock, editUserMock;

  beforeEach(() => {
    setUsersMock = jest.fn();
    setErrorMock = jest.fn();
    addUserMock = jest.fn();
    deleteUserMock = jest.fn();
    editUserMock = jest.fn();

    store = new Vuex.Store({
      state: {
        users: null,
        addNewUserError: false
      },
      mutations: {
        FETCH_USERS: setUsersMock,
        ADD_NEW_USER_ERROR: setErrorMock,
        ADD_USER: addUserMock,
        DELETE_USER: deleteUserMock,
        EDIT_USER: editUserMock
      },
      actions: {
        fetchUsers: actions.fetchUsers,
        setError: actions.setError,
        addUser: actions.addUser,
        deleteUser: actions.deleteUser,
        editUser: actions.editUser
      }
    });
  });

  test('should fetch data from Rest API and save into store', () => {
    store.hotUpdate({
      mutations: { FETCH_USERS: setUsersMock }
    });

    return store.dispatch('fetchUsers')
      .then((res) => {
        expect(setUsersMock.mock.calls[0][1]).toEqual(users);
      })
  });

  test('should set error', () => {
    store.hotUpdate({
      mutations: { ADD_NEW_USER_ERROR: setErrorMock }
    });

    store.dispatch('setError', 'Error message');
    expect(setErrorMock.mock.calls[0][1]).toEqual('Error message');
  });

  test('should add new user', () => {
    store.hotUpdate({
      mutations: {
        ADD_USER: addUserMock,
        ADD_NEW_USER_ERROR: setErrorMock
      }
    });

    return store.dispatch('addUser', users[0])
      .then((res) => {
        expect(addUserMock.mock.calls[0][1]).toEqual(users[0]);
        expect(setErrorMock.mock.calls[0][1]).toBe(false);
      });
  });

  test('should delete user', () => {
    store.hotUpdate({
      mutations: {
        DELETE_USER: deleteUserMock,
        ADD_NEW_USER_ERROR: setErrorMock
      }
    });

    return store.dispatch('deleteUser', 1)
      .then((res) => {
        expect(deleteUserMock.mock.calls[0][1]).toBe(1);
        expect(setErrorMock.mock.calls[0][1]).toBe(false);
      });
  });

  test('should edit user', () => {
    store.hotUpdate({
      mutations: {
        EDIT_USER: editUserMock,
        ADD_NEW_USER_ERROR: setErrorMock
      }
    });

    return store.dispatch('editUser', users[1])
      .then((res) => {
        expect(editUserMock.mock.calls[0][1]).toEqual(users[1]);
        expect(setErrorMock.mock.calls[0][1]).toBe(false);
      });
  })
});
