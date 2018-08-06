<template>
  <div>
    <div>
      <div class="text-center text-sm-right pt-2 pb-4">
        <router-link class="btn btn-success" to="/addnew">Add new user</router-link>
      </div>
      <div class="table-responsive-md">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Phone</th><th>Country</th><th>Services</th><th></th>
            </tr>
          </thead>
          <tbody>
            <app-user-list-item
              v-for="user in users"
              :key="user.id"
              :user="user"
            ></app-user-list-item>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import UserListItem from '../UserListItem';
export default {
  computed: {
    users() {
      return this.$store.getters.users;
    }
  },
  created() {
    this.$store.dispatch('setError', false);
  },
  components: {
    AppUserListItem: UserListItem
  }
}
</script>

<style lang="sass" scoped>

</style>