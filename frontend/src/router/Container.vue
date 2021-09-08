<template>
  <div class="container">
    <div class="contents">
      <div class="contents-toplabel">
        <div class="board-label">게시판</div>
      </div>
      <div
        class="content"
        v-for="(content, contentIndex) in contents"
        :key="contentIndex"
        @click="readContent(content.id)"
      >
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
            {{ content.created.split("T")[0] }}
          </div>
        </div>
      </div>
      <div class="pages">
        <span
          class="page prev"
          v-if="currentPageWrap !== 0"
          @click="pagePrevWrap"
        >
          이전
        </span>
        <span
          class="page"
          v-for="pageNumber in pageNumberList"
          :class="pageNumber === currentPage ? 'active' : ''"
          :key="pageNumber"
          @click="pageHandler(pageNumber)"
        >
          [{{ pageNumber }}]
        </span>
        <span
          class="page next"
          v-if="(currentPageWrap + 1) * 5 <= maxPageNumber"
          @click="pageNextWrap"
        >
          다음
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import defaultAPI from "~/core/defaultAPI";

export default {
  created() {
    /* 
      DB로부터 글 목록 가져오기.
      author query가 정의되어 있으면 작성자=author 로 필터링
    */
    if (this.$route.query.user_id === undefined) {
      this.$http.get(`${defaultAPI.end_point}/content`).then((response) => {
        this.contents = response.data.topics;
        this.maxPageNumber = Math.ceil(response.data.length / 10);
      });
    } else {
      this.$http
        .get(
          `${defaultAPI.end_point}/content/get_by_author?user_id=${this.$route.query.user_id}`
        )
        .then((response) => {
          this.contents = response.data;
        });
    }
  },
  data() {
    return {
      contents: [],
      currentPage: 1,
      currentPageWrap: 0,
      maxPageNumber: 1,
    };
  },
  computed: {
    pageNumberList() {
      let res = [];
      let startPageNumber = this.currentPageWrap * 5;
      if (startPageNumber + 5 > this.maxPageNumber) {
        for (let i = 1; i <= this.maxPageNumber - startPageNumber; i++) {
          res.push(startPageNumber + i);
        }
      } else {
        for (let i = 1; i <= 5; i++) {
          res.push(startPageNumber + i);
        }
      }
      return res;
    },
  },
  methods: {
    readContent(id) {
      this.$http
        .get(`${defaultAPI.end_point}/content?id=${id}`)
        .then((response) => {
          let data = response.data[0];
          this.$router.push({
            name: "Read",
            query: {
              id: data.id,
            },
          });
        });
    },
    pageHandler(pageNumber) {
      this.$http
        .get(`${defaultAPI.end_point}/content/page?page=${pageNumber - 1}`)
        .then((response) => {
          this.contents = response.data;
          this.currentPage = pageNumber;
        });
    },
    pageNextWrap() {
      this.currentPageWrap += 1;
      this.pageHandler(this.currentPageWrap * 5 + 1);
    },
    pagePrevWrap() {
      this.currentPageWrap -= 1;
      this.pageHandler(this.currentPageWrap * 5 + 1);
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
      width: 80%;
      font-size: 14px;
    }
    &.created {
      font-size: 11px;
    }
  }
}
.pages {
  height: 50px;
  border-top: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
  .page {
    margin-right: 5px;
    cursor: pointer;
    &.active {
      font-weight: 700;
    }
  }
}
</style>
