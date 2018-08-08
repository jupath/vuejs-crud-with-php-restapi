import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import Header from '../../src/components/Header.vue';

describe('Header.vue', () => {
  test('should render Header correctly', () => {
    const wrapper = shallowMount(Header, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  })
})
