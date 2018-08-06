import axios from 'axios';
import router from '../router';
import * as types from './mutation-types';

const actions = {
  fetchUsers: ({commit}) => {
    axios.get('/api.php?action=read')
      .then(res => {
        if (!res.error) {
          commit(types.FETCH_USERS, res.data.users);
        }
      })
      .catch(err => console.error(err));
  },
  addUser: ({commit}, user) => {
    const data = new FormData();
		for ( let key in user ) {
      data.append(key, user[key]);
    }

    axios.post('/api.php?action=create', data)
      .then(res => {
        if (!res.data.error) {
          commit(types.ADD_USER, user);
          commit(types.ADD_NEW_USER_ERROR, false);
          router.replace('/');
        } else {
          commit(types.ADD_NEW_USER_ERROR, res.data.message);
        }
      })
      .catch(err => console.error(err));
  },
  setError: ({commit}, error) => {
    commit(types.ADD_NEW_USER_ERROR, error);
  },
  editUser: ({commit}, editedUser) => {
    const data = new FormData();
		for ( let key in editedUser ) {
      data.append(key, editedUser[key]);
    }

    axios.post('/api.php?action=update', data)
      .then(res => {
        if (!res.data.error) {
          commit(types.EDIT_USER, editedUser);;
          commit(types.ADD_NEW_USER_ERROR, false);
          router.replace('/');
        } else {
          commit(types.ADD_NEW_USER_ERROR, res.data.message);
        }
      })
      .catch(err => console.error(err));
  },
  deleteUser: ({commit}, id) => {
    const data = new FormData();
    data.append('id', id);

    axios.post('/api.php?action=delete', data)
      .then(res => {
        console.log(res);
        if (!res.data.error) {
          commit(types.DELETE_USER, id);
          commit(types.ADD_NEW_USER_ERROR, false);
        } else {
          commit(types.ADD_NEW_USER_ERROR, res.data.message);
        }
      })
      .catch(err => console.error(err));
  }
};

export default actions;
