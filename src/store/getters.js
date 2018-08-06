const getters = {
  users: (state) => {
    return state.users;
  },
  error: (state) => {
    return state.addNewUserError;
  }
};

export default getters;
