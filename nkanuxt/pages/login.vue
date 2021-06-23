<template>
  <div
    id="login"
  >
    <v-container>
      <v-row
        no-gutters
        justify="center"
      >
        <v-col sm="12" md="8" lg="4">
          <div class="d-flex flex-column align-center">
            <img src="../assets/lightning.png" width="50px;" alt="">
            <h1>
              Login to NKA
            </h1>
            <login-form style="width: 100%" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LoginForm from '../components/auth/LoginForm.vue'
export default {
  name: 'Login',
  components: { LoginForm },
  created () {
    // user is not authorized => Remain at login page
    if (this.$store.state.isAuthenticated) {
      this.$router.push('/')
    }
  }
}
</script>
