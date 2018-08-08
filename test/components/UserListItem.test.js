import { mount, RouterLinkStub } from '@vue/test-utils';
import UserListItem from '../../src/components/UserListItem.vue';
import users from '../fixtures/users';

describe('UserListItem.vue', () => {
  let wrapper, handleDeleteUser;
  beforeEach(() => {
    handleDeleteUser = jest.fn();
    wrapper = mount(UserListItem, {
      propsData: {
        user: users[0]
      },
      stubs: {
        RouterLink: RouterLinkStub
      },
      methods: {
        handleDeleteUser
      }
    })
  });

  test('should render UserListItem correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should open modal when click on Details button', () => {
    const detailsButton = wrapper.find('#details');
    detailsButton.trigger('click');
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should open confirmation modal when click on Delete button then call handleDeleteUser method when click on Delete button in modal', () => {
    const deleteButton = wrapper.find('#delete-modal');
    deleteButton.trigger('click');
    expect(wrapper.html()).toMatchSnapshot();

    const deleteModal = wrapper.find('#delete');
    deleteModal.trigger('click');
    expect(handleDeleteUser).toHaveBeenCalled();
  });
});
