import { shallowMount } from '@vue/test-utils';
import PageNotFound from '../../../src/components/pages/PageNotFound.vue';

describe('PageNotFound', () => {
  test('render PageNotFound correctly', () => {
    const wrapper = shallowMount(PageNotFound);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
