<template>
  <v-form v-model="valid">
    <v-text-field
      v-model="email"
      :rules="[rules.required, rules.email]"
      label="E-mail"
    />

    <v-text-field
      v-model="password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required]"
      :type="show1 ? 'text' : 'password'"
      name="input-10-1"
      label="Password"
      @click:append="show1 = !show1"
    />
    <div class="d-flex justify-space-between">
      <v-btn
        :loading="logInLoading"
        :disabled="logInLoading"
        color="success"
        elevation="10"
        raised
        @click="handleSubmit"
      >
        Log in
        <template #loader>
          <span>Loading...</span>
        </template>
      </v-btn>
      <v-btn
        :loading="logInLoading"
        :disabled="logInLoading"
        color="secondary"
        @click="handleSubmit"
      >
        Forgot my password
        <template #loader>
          <span>Loading...</span>
        </template>
      </v-btn>
    </div>
  </v-form>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'LoginForm',
  data () {
    return {
      show1: false,
      valid: false,
      email: '',
      password: '',
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length <= 20 || 'Max 20 characters',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    }
  },
  computed: {
    logInLoading () {
      return this.$store.state.auth.logInLoading
    }
  },
  methods: {
    handleSubmit: function login () {
      const user = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('auth/login', user).then(() => {
        // if successfull
        if (this.$store.getters['auth/GET_AUTH']) {
          window.console.log('yeey')
          this.$router.push({ path: '' })
        } else {
          this.alertMessage =
              "We don't seem to have the credentials you typed in as a registered user. Please double-check and try again."
        }
      })
    }
  }
}
</script>
