import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router'
import Dashboard from '../../../src/components/pages/Dashboard.vue';
import users from '../../fixtures/users';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe('Dashboard.vue', () => {
  let getters, store;

  beforeEach(() => {
    getters = {
      users: () => users,
    };
    store = new Vuex.Store({
      getters
    });
  })

  test('should render Dashboard correctly', () => {
    const wrapper = shallowMount(Dashboard, {
      store,
      localVue
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
