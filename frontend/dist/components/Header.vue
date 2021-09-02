<template>
  <header>
    <RouterLink
      to="/"
      class="logo">
      MY-SIMPLE-<span class="highlight">FORUM</span>
    </RouterLink>
    <RouterLink
      to="/login"
      v-if="!$store.state.user.isLoggedIn">
      <div class="btn">
        LOGIN
      </div>
    </RouterLink>
    <RouterLink
      to="/signin"
      v-if="!$store.state.user.isLoggedIn">
      <div class="btn blue">
        SIGNIN
      </div>
    </RouterLink>
    <div v-else>
      <div
        class="btn"
        @click="logoutHandler()">
        LOGOUT
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    logoutHandler() {
      localStorage.removeItem('accessToken');
      this.$store.commit('user/resetState');
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  height: 75px;
  padding: 0 200px;
  display: flex;
  align-items: center;
  .logo {
    margin: 0 auto;
    text-decoration: none;
    font-family: 'Oswald', sans-serif;
    font-size: 21px;
    .highlight {
      color: rgb(214, 129, 0);
    }
  }
}
</style>