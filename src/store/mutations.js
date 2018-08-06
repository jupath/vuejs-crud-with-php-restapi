import * as types from './mutation-types';

const mutations = {
  [types.FETCH_USERS] (state, users) {
    state.users = users;
  },

  [types.ADD_USER] (state, user) {
    state.users.push(user);
  },

  [types.ADD_NEW_USER_ERROR] (state, error) {
    state.addNewUserError = error;
  },

  [types.EDIT_USER] (state, editedUser) {
    state.users = state.users.map(user => {
      if (user.id === editedUser.id) {
        return {
          ...user,
          ...editedUser
        }
      }
      return user;
    });
  },

  [types.DELETE_USER] (state, id) {
    state.users = state.users.filter(user => user.id !== id);
  }
};

export default mutations;
