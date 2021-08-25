<template>
  <header>
    <RouterLink
      to="/"
      class="logo">
      LOGO
    </RouterLink>
  </header>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
header {
  height: 75px;
  padding: 0 50px;
  display: flex;
  align-items: center;
  background-color: orange;
  .logo {
    text-decoration: none;
  }
}
</style>