<template>
  <v-app dark>
    <navbar />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <foot />
  </v-app>
</template>

<script>
import Navbar from '../components/common/Navbar.vue'
import Foot from '../components/common/Foot.vue'

export default {
  components: { Navbar, Foot },
  data () {
    return {
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.isAuthenticated
    }
  },
  created () {
    this.$store.dispatch('auth/refreshToken').then(() => {
      if (!this.$store.state.isAuthenticated) {
        this.$store.dispatch('auth/logout')
        this.$router.push('/login')
      }
    })
  }
}
</script>
