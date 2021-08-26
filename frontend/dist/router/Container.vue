<template>
  <div class="container">
    <div class="contents">
      <!-- <div
        class="content"
        v-for="(content, idx) in contents"
        :key="idx"
        @click="readContent(content.id)">
        <span class="content-title">{{ content.title }}</span>
        <span class="content-author">{{ content.author }}</span>
      </div> -->
      <div
        class="content"
        v-for="(content, contentIndex) in contents"
        :key="contentIndex"
        @click="readContent(content.id)">
        <div class="content-top">
          {{ content.title }}
        </div>
        <div class="content-bottom">
          <div class="content-bottom author">
            {{ content.author }}
          </div>
          <div class="content-bottom created">
            {{ content.created.split('T')[0] }}
          </div>
        </div>
      </div>
    </div>
    <div class="btn-container">
      <RouterLink :to="{ name: 'Add', params: { mode: 'add' } }">
        <button>글쓰기</button>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import defaultAPI from '~/core/defaultAPI'
export default {
  data() {
    return {
      contents: [],
    };
  },
  created() {
    this.$http.get(`${defaultAPI.end_point}/content`).then((response) => {
      console.log(response);
      this.contents = response.data;
    });
  },
  methods: {
    readContent(id) {
      this.$http.get(`${defaultAPI.end_point}/content?id=${id}`).then((response) => {
        let data = response.data[0];
        this.$router.push({
          name: "Read",
          params: {
            id: data.id,
            title: data.title,
            description: data.description,
          },
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/scss/main";
.container {
  height: 75vh;
}
.content {
  height: 70px;
  padding: 0 30px;
  &:hover {
    background-color: rgb(189, 189, 189);
  }
  .content-top {
    display: flex;
    align-items: center;
    height: 50%;
  }
  .content-bottom {
    height: 50%;
    display: flex;
    &.author {
      width: 300px;
      font-size: 14px;
    }
    &.created {
      font-size: 11px;
    }
  }
}
.btn-container {
  width: 100%;
  height: 10vh;
  display: flex;
  align-items: center;
}
</style>
