<template>
  <div class="container">
    <div class="contents">
      <div class="contents-toplabel">
        <div class="board-label">게시판</div>
      </div>
      <!-- state의 글 목록을 바탕으로 div리스트 생성 -->
      <!-- 제목, 작성자, 생성일 정보 렌더링 -->
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
        <!-- 첫 페이지 그룹이면 이전 버튼 생성하지 않음 -->
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
        <!-- 마지막 페이지 그룹이면 다음 버튼 생성하지 않음 -->
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
import config from "~/key/config";
const endpoint = config.endpoint;

export default {
  created() {
    /*
      DB에서 글 목록 가져오기
      user_id가 쿼리에 명시되어 있으면 해당 유저의 글만 가져옴.
      글 개수를 10개로 나누어 올려 전체 페이지 개수를 결정.
    */
    if (this.$route.query.user_id === undefined) {
      this.$http.get(`${endpoint}/content`).then((response) => {
        this.contents = response.data.topics;
        this.maxPageNumber = Math.ceil(response.data.length / 10);
      });
    } else {
      this.$http
        .get(
          `${endpoint}/content/get_by_author?user_id=${this.$route.query.user_id}`
        )
        .then((response) => {
          this.contents = response.data;
        });
    }
  },
  data() {
    return {
      contents: [], // 글 목록
      currentPage: 1, // 현재 페이지
      currentPageWrap: 0, // 현재 페이지 그룹 (0~5페이지: 0, 6~10페이지: 1 ...)
      maxPageNumber: 1, // 전체 글 개수로 만들 수 있는 최대 페이지 개수
    };
  },
  computed: {
    /* 
      pageNumberList - 랜더링 될 페이지 숫자들을 배열 형태로 반환
      state.currentPageWrap 을 바탕으로 5의 배수로 끊어 1~5, 6~10과 같이 5개의 숫자를 생성하여 반환함.
      ex. state.currentPageWrap = 1 이면 [6, 7, 8, 9, 10], 2이면 [11, 12, 13, 14, 15]
    */
    pageNumberList() {
      let result = [];
      let startPageNumber = this.currentPageWrap * 5;
      if (startPageNumber + 5 > this.maxPageNumber) {
        for (let i = 1; i <= this.maxPageNumber - startPageNumber; i++) {
          result.push(startPageNumber + i);
        }
      } else {
        for (let i = 1; i <= 5; i++) {
          result.push(startPageNumber + i);
        }
      }
      return result;
    },
  },
  methods: {
    /* 
      글 목록에서 글 클릭 시 실행
      id (글 색인번호)를 쿼리로 담아 '/read' 페이지로 이동.
    */
    readContent(id) {
      this.$router.push({
        name: "Read",
        query: {
          id,
        },
      });
    },
    /* 
      글 목록 아래의 페이지 넘버 클릭 시 실행
      해당하는 페이지의 글 목록 10개를 가져와 state.contents 에 저장.
    */
    pageHandler(pageNumber) {
      this.$http
        .get(`${endpoint}/content/page?page=${pageNumber - 1}`)
        .then((response) => {
          this.contents = response.data;
          this.currentPage = pageNumber;
        });
    },
    /* 
      페이지 넘버 우측의 다음 클릭 시 실행
      다음 페이지 그룹으로 이동
    */
    pageNextWrap() {
      this.currentPageWrap += 1;
      this.pageHandler(this.currentPageWrap * 5 + 1);
    },
    /* 
      페이지 넘버 좌측의 이전 클릭 시 실행
      이전 페이지 그룹으로 이동.
    */
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
