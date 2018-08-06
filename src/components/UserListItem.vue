<template>
  <tr>
    <td>{{ user.name }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.phone }}</td>
    <td>{{ user.country }}</td>
    <td>{{ user.services }}</td>
    <td class="text-right">
      <button class="btn btn-info btn-sm" @click="showDetailsModal = true">Details</button>
      <router-link class="btn btn-success btn-sm" :to="`/edituser/${user.id}`">Edit</router-link>
      <button class="btn btn-danger btn-sm" @click="showDeleteModal = true">Delete</button>
    </td>
    <!-- Modal Delete -->
    <app-modal v-if="showDeleteModal" >
      <h5 slot="header" class="modal-title">
        Delete user
      </h5>
      <p slot="body">
        Are you sure you want to delete <b>{{ user.name }}</b>&apos;s profile?
      </p>
      <div slot="footer">
        <button
          type="button"
          class="btn btn-danger"
          @click="handleDeleteUser"
        >
          Delete
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          @click="showDeleteModal = false"
        >
          Cancel
        </button>
      </div>
    </app-modal>
    <!-- /Modal Delete -->
    <!-- Modal Details -->
    <app-modal v-if="showDetailsModal" >
      <h5 slot="header" class="modal-title">
        <b>{{ user.name }}</b>
      </h5>
      <p slot="body">
        <ul class="list-unstyled">
          <li>Name: {{ user.name }}</li>
          <li>Email: {{ user.email }}</li>
          <li>Phone: {{ user.phone }}</li>
          <li>Country: {{ user.country }}</li>
          <li>Services: {{ user.services }}</li>
          <li>Newsletter: {{ user.newsletter }}</li>
        </ul>
      </p>
      <div slot="footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          @click="showDetailsModal = false"
        >
          Cancel
        </button>
      </div>
    </app-modal>
    <!-- /Modal Details -->
  </tr>
</template>

<script>
import Modal from './Modal';

export default {
  props: {
    user: Object
  },
  data() {
    return {
      showDeleteModal: false,
      showDetailsModal: false,
    }
  },
  methods: {
    handleDeleteUser() {
      this.$store.dispatch('deleteUser', this.user.id);
    }
  },
  components: {
    appModal: Modal
  }
}
</script>
