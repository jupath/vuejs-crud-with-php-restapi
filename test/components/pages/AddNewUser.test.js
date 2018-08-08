import { shallowMount } from '@vue/test-utils';
import AddNewUser from '../../../src/components/pages/AddNewUser.vue';
import users from '../../fixtures/users';

describe('AddNewUser.vue', () => {
  test('should render AddNewUser correctly', () => {
    const wrapper = shallowMount(AddNewUser);
    expect(wrapper.html()).toMatchSnapshot();
  })

  test('should call saveUser method when userData is emitted', () => {
    const saveUser = jest.fn();
    const wrapper = shallowMount(AddNewUser);

    wrapper.vm.$on('userData', saveUser);
    wrapper.vm.$emit('userData', users[0]);

    expect(saveUser).toHaveBeenLastCalledWith(users[0]);
  })
});
