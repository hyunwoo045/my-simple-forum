<template>
  <div class="container">
    <div class="contents">
      <div
        class="content"
        v-for="(content, idx) in contents"
        :key="idx"
        @click="readContent(content.id)">
        <span class="content-id">{{ content.id }}</span>
        <span class="content-title">{{ content.title }}</span>
        <span class="content-author">{{ content.author }}</span>
      </div>
    </div>
    <div class="btn-container">
      <RouterLink :to="{name: 'Add', params: {mode: 'add'}}">
        <button>글쓰기</button>
      </RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contents: [],
    }
  },
  created() {
    this.$http.get('/api/home').then((response) => {
      console.log(response)
      this.contents = response.data;
    })
  },
  methods: {
    readContent(id) {
      this.$http.get(`/api/home?id=${id}`).then(response => {
        let data = response.data[0]
        this.$router.push({
          name: 'Read',
          params: {
            id: data.id,
            title: data.title,
            description: data.description
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/scss/main';

.container {
  width: 85%;
  height: 75vh;
  .contents {
    height: 70vh;
    .content {
      height: 40px;
      display: flex;
      align-items: center;
      &:hover {
        background-color: rgb(218, 218, 218);
      }
      & > span {
        display: inline-block;
        border-right: 1px solid #000;
        box-sizing: border-box;
        padding-left: 20px;
      }
      & > span:last-child {
        border-right: none;  
      }
      .content-id {
        width: 10%;
      }
      .content-title {
        width: 70%;
        text-align: left;
      }
      .content-author {
        width: 20%;
      }
    }
  }
  .btn-container {
    width: 100%;
    height: 10vh;
    display: flex;
    align-items: center;
  }
}
</style>