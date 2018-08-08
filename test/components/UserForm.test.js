import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import UserForm from '../../src/components/UserForm.vue';
import users from '../fixtures/users';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('UserForm.vue', () => {

  test('should render correctly when form is child of AddNewUser page', () => {
    let store, getters;
    getters = {
      error: () => false,
    };
    store = new Vuex.Store({
      getters
    });

    const wrapper = shallowMount(UserForm, {
      propsData: {
        formType: 'addNewUser'
      },
      store,
      localVue
    });
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find('#error-message').exists()).toBe(false);
  })

  test('should render correctly when form is child of EditUserData page', () => {
    let store, getters;
    getters = {
      error: () => false,
    };
    store = new Vuex.Store({
      getters
    });
    const wrapper = shallowMount(UserForm, {
      propsData: {
        formType: 'editUser',
        userProp: users[1]
      },
      store,
      localVue
    });
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find('#error-message').exists()).toBe(false);
  })

  test('should display error message', () => {
    let store, getters;
    getters = {
      error: () => 'Error message',
    };
    store = new Vuex.Store({
      getters
    });
    const wrapper = shallowMount(UserForm, {
      propsData: {
        formType: 'editUser',
        userProp: users[1]
      },
      store,
      localVue
    });
    expect(wrapper.find('#error-message').exists()).toBe(true);
  })

  test('should submit form without errors', () => {
    let store, getters;
    getters = {
      error: () => false,
    };
    store = new Vuex.Store({
      getters
    });

    const handleSaveUser = jest.fn();

    const wrapper = shallowMount(UserForm, {
      propsData: {
        formType: 'addNewUser'
      },
      methods: {
        handleSaveUser
      },
      store,
      localVue,
    });

    wrapper.setData({
      user: {
        ...users[0],
        password: '123456',
        passwordAgain: '123456'
      }
    });

    const form = wrapper.find('form');

    form.trigger('submit');
    expect(handleSaveUser).toHaveBeenCalled();
    expect(wrapper.findAll('.error').length).toBe(0);
  })
});
