import { shallowMount } from '@vue/test-utils';
import Modal from '../../src/components/Modal.vue';

describe('Modal.vue', () => {
  test('should render Modal correctly', () => {
    const wrapper = shallowMount(Modal);
    expect(wrapper.html()).toMatchSnapshot();
  });
})
