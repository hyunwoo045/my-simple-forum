<template>
  <header>
    <RouterLink
      to="/"
      class="logo">
      MY-SIMPLE-<span class="highlight">FORUM<span>
      </span></span>
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