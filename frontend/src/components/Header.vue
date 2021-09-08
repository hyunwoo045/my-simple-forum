<template>
  <header>
    <RouterLink to="/" class="logo">
      MY-SIMPLE-<span class="highlight">FORUM</span>
    </RouterLink>
    <div>
      <div class="btn" @click="logoutHandler()">LOGOUT</div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    logoutHandler() {
      if (confirm("로그아웃 하시겠습니까?")) {
        this.$store.commit("user/resetState");
        this.$router.push("/login");
      }
      return;
    },
  },
};
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
    font-family: "Oswald", sans-serif;
    font-size: 21px;
    .highlight {
      color: rgb(214, 129, 0);
    }
  }
}
</style>
