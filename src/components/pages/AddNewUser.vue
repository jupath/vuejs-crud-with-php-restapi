<template>
  <div>
    <h3 class="text-center">Add new user</h3>
    <app-user-form
      formType="addNewUser"
      @userData="saveUser"
    ></app-user-form>
  </div>
</template>

<script>
import UsersForm from '../UserForm';

export default {
  methods: {
    saveUser(user) {
      this.$store.dispatch('addUser', user);
    }
  },
  components: {
    appUserForm: UsersForm
  }
}
</script>
