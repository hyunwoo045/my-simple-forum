<template>
  <div>
    <header>
      <Header />
    </header>
    <section>
      <RouterView />
    </section>
  </div>
</template>

<script>
import Header from '~/components/Header';
export default ({
  components: {
    Header,
  },

  data() {
    return {
      message: 'Hello Vue!'
    }
  }
})
</script>
