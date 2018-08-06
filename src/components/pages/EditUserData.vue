<template>
  <div>
    <h3 class="text-center">{{ user.name }}</h3>
    <app-user-form
      :userProp="user"
      formType="editUser"
      @userData="updateUser"
    ></app-user-form>
  </div>
</template>

<script>
import UserForm from '../UserForm';
export default {
  methods: {
    updateUser(editedUser) {
      this.$store.dispatch('editUser', editedUser);
    }
  },
  computed: {
    user() {
      const user = this.$store.state.users.find(user => user.id === this.$route.params.id);
      return {
        ...user,
        services: user.services.split(', '),
      }
    }
  },
  components: {
    appUserForm: UserForm
  }
}
</script>

<style lang="sass" scoped>

</style>