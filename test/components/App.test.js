import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router'
import App from '../../src/App.vue';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe('App.vue', () => {
  let actions, store;

  beforeEach(() => {
    actions = {
      fetchUsers: jest.fn(),
    }
    store = new Vuex.Store({
      state: {},
      actions
    })
  })

  test('should render App correctly', () => {
    const wrapper = shallowMount(App, {
      store,
      localVue
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
