<template>
  <header>
    <RouterLink
      to="/"
      class="logo">
      HOME
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
  padding: 0 200px;
  display: flex;
  align-items: center;
  .logo {
    text-decoration: none;
  }
}
</style>