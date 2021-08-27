<template>
  <div>
    <header>
      <Header />
    </header>
    <section>
      <Userbox />
      <RouterView />
    </section>
  </div>
</template>

<script>
import Header from '~/components/Header';
import Userbox from '~/components/Userbox'
export default ({
  components: {
    Userbox,
    Header,
  },

  data() {
    return {
      message: 'Hello Vue!'
    }
  }
})
</script>

<style lang="scss" scoped>
section {
  margin: 0 auto;
  width: 1100px;
  display: flex;
  justify-content: center;
}
</style>
