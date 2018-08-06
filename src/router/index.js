import Vue from 'vue';
import VueRouter from 'vue-router';

import Dashboard from '../components/pages/Dashboard.vue';
import AddNewUser from '../components/pages/AddNewUser.vue';
import EditUserData from '../components/pages/EditUserData.vue';
import PageNotFound from '../components/pages/PageNotFound.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Dashboard },
  { path: '/addnew', component: AddNewUser},
  { path: '/edituser/:id', component: EditUserData },
  { path: '*', component: PageNotFound }
];

export default new VueRouter({
  mode: 'history',
  routes
});
