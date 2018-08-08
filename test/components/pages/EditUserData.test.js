import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import EditUserData from '../../../src/components/pages/EditUserData.vue';
import users from '../../fixtures/users';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('EditUserData.vue', () => {
  let store, state;

  beforeEach(() => {
    state = {
      users,
    };
    store = new Vuex.Store({
      state
    });
  })

  test('should render EditUserData correctly', () => {
    const wrapper = shallowMount(EditUserData, {
      store,
      localVue,
      mocks: {
        $route: {
          params: { id: 1 }
        }
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should call updateUser method when userData is emitted', () => {
    const updateUser = jest.fn();
    const wrapper = shallowMount(EditUserData, {
      store,
      localVue,
      mocks: {
        $route: {
          params: { id: 1 }
        }
      }
    });

    wrapper.vm.$on('userData',  updateUser);
    wrapper.vm.$emit('userData', users[0]);

    expect(updateUser).toHaveBeenLastCalledWith(users[0]);
  })
});
