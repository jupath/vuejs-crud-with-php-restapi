import users from '../test/fixtures/users';

const axios = {
  get: () => new Promise(res => res({ data: {
    error: false,
    users
  }})),
  post: () => new Promise(res => res({ data: {
    error: false
  }}))
}
export default axios;