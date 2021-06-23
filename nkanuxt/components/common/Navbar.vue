<template>
  <div>
    <!-- <v-navigation-drawer
      v-model="drawer"
      clipped
      floating
      temporary

      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-toolbar fixed flat>
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <div>
        <img src="~/assets/navlogo.png" alt="navlogo" class="navlogo">
      </div>
      <v-divider class="mx-4" inset vertical />
      <v-btn text>
        Explore <v-icon>mdi-compass</v-icon>
      </v-btn>
      <v-divider class="mx-4" vertical inset />
      <v-btn text>
        Create <v-icon>mdi-plus-circle</v-icon>
      </v-btn>
      <v-divider class="mx-4" vertical inset />
      <v-btn text>
        Social <v-icon>mdi-account-group</v-icon>
      </v-btn>
      <v-spacer />
      {{ isLoggedIn }}
      <!-- <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
      <v-toolbar-items v-if="!isLoggedIn" class="hidden-sm-and-down">
        <v-btn text :to="'/login'">
          Log in
        </v-btn>
        <v-divider vertical inset />
        <v-btn text>
          Register
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else>
        <v-btn text @click="$store.dispatch('auth/logout')">
          Log out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!-- <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      //   clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      right: true,
      rightDrawer: false,
      title: 'NKA'
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.auth.isAuthenticated
    }
  }
}
</script>

<style scoped>
.navlogo {
  height: 50px;
  margin-bottom: -8px;
}
</style>
