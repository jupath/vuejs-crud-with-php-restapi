<template>
  <div class="px-lg-7">
    <form @submit.prevent="handleSaveUser">
      <div class="form-group" :class="{error: $v.user.name.$error}">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          aria-describedby="name"
          placeholder="Enter your name"
          v-model.trim="$v.user.name.$model"
        >
        <p v-if="$v.user.name.$error && !$v.user.name.required">{{ errorMessages.required }}</p>
      </div>
      <div class="form-group" :class="{error: $v.user.email.$error}">
        <label for="email">Email address</label>
        <input
          type="email"
          class="form-control"
          id="email"
          aria-describedby="email"
          placeholder="Enter your email"
          v-model.trim="$v.user.email.$model"
        >
        <p v-if="!$v.user.email.email">Please provide a valid email address</p>
        <p v-if="$v.user.name.$error && !$v.user.email.required">{{ errorMessages.required }}</p>
      </div>
      <div class="form-group" :class="{error: $v.user.phone.$error}">
        <label for="phone">Phone</label>
        <input
          type="text"
          class="form-control"
          id="phone"
          aria-describedby="phone"
          placeholder="Enter your phone number"
          v-model.trim="$v.user.phone.$model"
        >
        <p v-if="$v.user.name.$error && !$v.user.phone.required">{{ errorMessages.required }}</p>
      </div>
      Your gender:
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="gender"
          id="gender1"
          value="male"
          v-model="user.gender"
        >
        <label class="form-check-label" for="gender1">male</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="gender"
          id="gender2"
          value="female"
          v-model="user.gender"
        >
        <label class="form-check-label" for="gender2">female</label>
      </div>
      <div class="form-group" :class="{error: $v.user.password.$error}" v-if="formType === 'addNewUser'">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          aria-describedby="password"
          placeholder="Choose a password (min 6 characters)"
          v-model.trim="$v.user.password.$model"
        >
        <p v-if="$v.user.password.$error && !$v.user.password.required">{{ errorMessages.required }}</p>
        <p v-if="!$v.user.password.minLength">Password must have at least {{ $v.user.password.$params.minLength.min }} letters.</p>
      </div>
      <div class="form-group" :class="{error: $v.user.passwordAgain.$error}" v-if="formType === 'addNewUser'">
        <label for="password-again">Repeat password</label>
        <input
          type="password"
          class="form-control"
          id="password-again"
          aria-describedby="password-again"
          placeholder="Enter your password again"
          v-model.trim="$v.user.passwordAgain.$model"
        >
        <p v-if="$v.user.passwordAgain.$error && !$v.user.passwordAgain.sameAsPassword">Passwords must be identical.</p>
      </div>
      Choose services:
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          value="mobile"
          id="service-mobile"
          v-model="user.services"
        >
        <label class="form-check-label" for="service-mobile">
          Mobile
        </label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          value="internet"
          id="service-internet"
          v-model="user.services"
        >
        <label class="form-check-label" for="service-internet">
          Internet
        </label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          value="tv"
          id="service-tv"
          v-model="user.services"
        >
        <label class="form-check-label" for="service-tv">
          TV
        </label>
      </div>
      <div class="form-group" :class="{error: !$v.user.country.required}">
        <label for="country">Select your country</label>
        <select
          class="form-control"
          id="country"
          v-model="$v.user.country.$model"
        >
          <option
            v-for="(country, index) in countries"
            :key="index"
            :value="country"
          >
          {{ country }}
          </option>
        </select>
        <p class="error" v-if="!$v.user.country.required">If you pick services country is required</p>
      </div>
      <div class="form-group">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="newsletter"
            v-model="user.newsletter"
          >
          <label class="form-check-label" for="newsletter">
            Newsletter?
          </label>
        </div>
      </div>
      <div class="text-danger font-weight-bold py-3" v-if="error">{{ error }}</div>
      <button type="submit" class="btn btn-primary">Save</button>
    </form>
  </div>
</template>

<script>
import { email, required, sameAs, minLength, requiredIf } from 'vuelidate/lib/validators';
import formMixin from '../mixins/form';

export default {
  props: {
    userProp: {
      default: () => ({
        id: null,
        name: '',
        email: '',
        phone: '',
        gender: '',
        services: [],
        country: '',
        newsletter: false,
      }),
      type: Object,
    },
    formType: String,
  },
  mixins: [formMixin],
  data() {
    return {
      countries: ['Germany', 'Hungary', 'Italy', 'Spain', 'UK', 'USA'],
      user: {
        name: this.userProp.name,
        email: this.userProp.email,
        phone: this.userProp.phone,
        gender: this.userProp.gender,
        password: '',
        passwordAgain: '',
        services: this.userProp.services,
        country: this.userProp.country,
        newsletter: this.userProp.newsletter,
      },
      errorMessages: {
        required: 'Required field'
      }
    }
  },
  validations: {
    user: {
      name: {
        required,
      },
      email: {
        required,
        email,
      },
      phone: {
        required,
      },
      password: {
        required: requiredIf(function() {
          return this.formType === 'addNewUser';
        }),
        minLength: minLength(6),
      },
      passwordAgain: {
        sameAsPassword: sameAs('password'),
      },
      country: {
        required: requiredIf(vm => {
          return vm.services.length > 0;
        })
      }
    }
  },
  methods: {
    handleSaveUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.$emit('userData', {
          ...this.user,
          services: this.user.services.join(', '),
          id: this.userProp.id
        });
      }
    }
  },
  computed: {
    error() {
      return this.$store.getters.error;
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
  color: red;
  input {
    border: 1px solid red;
  }
}
</style>
