<template>
  <div class="container">
    <div class="contents">
      <div class="contents-toplabel">
        <div class="board-label">
          게시판
        </div>
      </div>
      <div
        class="content"
        v-for="(content, contentIndex) in contents"
        :key="contentIndex"
        @click="readContent(content.id)">
        <div class="content-top">
          <div class="title">
            {{ content.title }}
          </div>
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
      <div
        class="see-more"
        @click="seeMoreContents">
        {{ canSeeMore ? "더보기" : "더보기 없음" }}
      </div>
    </div>
  </div>
</template>

<script>
import defaultAPI from '~/core/defaultAPI'
export default {
  data() {
    return {
      contents: [],
      currentPage: 1,
      canSeeMore: true,
    }
  },
  created() {
    if (this.$route.query.author === undefined) {
      this.$http.get(`${defaultAPI.end_point}/content`).then((response) => {
        this.contents = response.data;
      });
    } else {
      this.$http.get(`${defaultAPI.end_point}/content/get_by_author?author=${this.$route.query.author}`).then(response => {
        this.contents = response.data;
      });
    }
  },
  methods: {
    readContent(id) {
      this.$http.get(`${defaultAPI.end_point}/content?id=${id}`).then((response) => {
        let data = response.data[0];
        this.$router.push({
          name: "Read",
          query: {
            id: data.id,
          },
        });
      });
    },
    seeMoreContents() {
      this.$http.get(`${defaultAPI.end_point}/content/page?page=${this.currentPage}`).then(response => {
        if (response.data.length > 0) {
          this.currentPage += 1;
          this.contents.push(...response.data);
        } else {
          this.canSeeMore = false;
        }
      })
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/scss/main";
.contents-toplabel {
  height: 70px;
  border-bottom: 1px solid gray;
  position: relative;
  .board-label {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 30px;
    font-weight: 700;
    font-size: 24px;
  }
}
.content {
  height: 70px;
  padding: 0 30px;
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    background-color: rgb(189, 189, 189);
  }
  .content-top {
    display: flex;
    align-items: center;
    height: 50%;
    .title {
      padding-top: 10px;
      font-size: 17px;
      font-weight: 600;
    }
  }
  .content-bottom {
    height: 50%;
    display: flex;
    padding: 4px 0;
    &.author {
      width: 300px;
      font-size: 14px;
    }
    &.created {
      font-size: 11px;
    }
  }
}
.see-more {
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid gray;
  &:hover {
    background-color: rgb(189, 189, 189);
  }
}
</style>
