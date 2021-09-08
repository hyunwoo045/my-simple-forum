<template>
  <RouterView />
</template>

<script>
export default {
  data() {
    return {
      message: "Hello Vue!",
    };
  },
};
</script>

<style lang="scss" scoped>
section {
  margin: 0 auto;
  width: 1100px;
  display: flex;
  justify-content: center;
}
</style>
