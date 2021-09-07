<template>
  <div class="content-detail">
    <div class="container">
      <div class="content-area-top">
        <div class="title">
          {{ contentTitle }}
        </div>
        <div class="author">
          작성자: {{ contentAuthor }}
        </div>
        <div class="links">
          <span @click="modifyHandler">수정</span>
          <span @click="deleteHandler">삭제</span>
        </div>
      </div>
      <div class="content-area-bottom">
        <div class="description">
          <p v-html="cleanHTML"></p>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="comment-area">
        <div class="comment-area label">
          댓글
        </div>
        <div
          class="comment-area inputs"
          v-if="$store.state.user.isLoggedIn">
          <div class="comment-write">
            <textarea
              class="comment-write-inner"
              placeholder="댓글을 입력하세요."
              v-model="commentDescription"></textarea>
          </div>
          <button
            class="comment-submit"
            @click="addComment">
            작성
          </button>
        </div>
        <div
          class="comment-area inputs"
          v-else>
          로그인 후 댓글을 작성해 주세요!
        </div>

        <div class="comment-area comments">
          <div
            class="comment"
            v-for="(comment, commentIdx) in comments"
            :key="commentIdx"
            @mouseenter="setCurrentCommentIndex(commentIdx)"
            @mouseleave="setCurrentCommentIndex(-1)">
            <div class="comment top">
              <div class="comment-author">
                {{ comment.author }}
              </div>
              <div class="comment-created">
                {{ comment.created.split("T")[0] }}
              </div>
            </div>
            
            <div class="comment bottom">
              <div class="description">
                {{ comment.description }}
              </div>
              <div
                class="comment-delete"
                @click="commentDelete(comment.user_id, comment.id)"
                v-if="curCommentIdx === commentIdx">
                삭제
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import defaultAPI from '~/core/defaultAPI'
import sanitizeHTML from 'sanitize-html';

export default {
  created() {
    /* 
      로그인 세션 확인하기
    */
    this.$store.dispatch("user/AccessTokenHandler").then(res => {
      if (res === "NOT_VALID_ACCESS_TOKEN") {
        this.$store.dispatch("user/RefreshTokenHandler").then(res => {
          if (res === "NOT_VALID_REFRESH_TOKEN") {
            this.$store.commit("user/resetState");
          }
        })
      } else if (res === "NEED_LOGIN") {
        this.$store.commit("user/resetState");
      }
    });

    /*
      글 정보 가져온 후에 댓글 목록 가져오기
    */
    this.contentId = this.$route.query.id;
    this.$http.get(`${defaultAPI.end_point}/content?id=${this.$route.query.id}`)
    .then(response => {
      this.contentTitle = response.data[0].title;
      this.contentDescription = response.data[0].description;
      this.contentAuthor = response.data[0].author;
      if (response.data[0].user_id === this.$store.state.user.id) {
        this.thisUserUpdatable = true;
      }
      this.$http.get(`${defaultAPI.end_point}/comment?id=${this.$route.query.id}`)
      .then(response => {
        this.comments = response.data;
      });
    });    
  },
  data() {
    return {
      contentId: -1,
      contentTitle: '',
      contentDescription: '',
      contentAuthor: '',
      curCommentIdx: -1,
      comments: [],
      commentDescription: '',
      thisUserUpdatable: false,
    }
  },
  computed: {
    cleanHTML() {
      return sanitizeHTML(this.contentDescription, {
        allowedTags: sanitizeHTML.defaults.allowedTags.concat(['strike'])
      });
    }
  },
  methods: {
    modifyHandler() {
      if (this.contentAuthor !== this.$store.state.user.username) {
        alert('수정 권한이 없습니다.');
        return
      }
      this.$router.push({
        name: 'Add',
        params: {
          mode: 'modify',
          contentId: this.contentId,
          title: this.contentTitle,
          description: this.contentDescription,
        },
      })
    },
    deleteHandler() {
      if (!this.thisUserUpdatable) {
        alert('삭제 권한이 없습니다.');
        return
      }

      if (confirm("정말 삭제하시겠습니까?") === true) {
        this.$http.post(`${defaultAPI.end_point}/content/delete`, { id: this.contentId }).then(() => {
          this.$router.push('/')
        })
      } else {
        return
      }
    },

    addComment() {
      this.$http.post(`${defaultAPI.end_point}/comment/create`, {
        user_id: this.$store.state.user.id,
        description: this.commentDescription,
        content_id: this.contentId
      }).then(() => {
        this.$http.get(`${defaultAPI.end_point}/comment?id=${this.contentId}`)
        .then(response => {
          this.comments = response.data;
        });
        this.commentDescription = '';
      });
    },
    commentDelete(user_id, id) {
      if (this.$store.state.user.id !== user_id) {
        alert('삭제 권한이 없습니다.');
        return
      }

      if (confirm("댓글을 정말 삭제하시겠습니까?") === true) {
        this.$http.post(`${defaultAPI.end_point}/comment/delete`, {
          id
        }).then(() => {
          this.$http.get(`${defaultAPI.end_point}/comment?id=${this.contentId}`)
          .then((response) => {
            this.comments = response.data;
          })
        });
      } else {
        return
      }
    },
    setCurrentCommentIndex(idx) {
      this.curCommentIdx = idx;
    }
  }
}
</script>

<style lang="scss">
@import '~/scss/main';
.container {
  margin-bottom: 30px;
}
.content-area-top {
  height: 110px;
  padding: 10px 20px;
  border-bottom: 1px solid gray;
  .title {
    padding: 8px 0;
    font-size: 23px;
    font-weight: 700;
    height: 42px;
  }
  .author {
    height: 34px;
    font-size: 14px;
  }
  .links {
    font-size: 14px;
    & > span {
      margin-right: 25px;
      cursor: pointer;
    }
    & > span:last-child {
      margin: 0;
      color: red;
    }
  }
}
.content-area-bottom {
  padding: 30px 20px;

  .description {
    white-space: pre;
  }
}

.comment-area {
  &.label {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    font-size: 20px;
    padding: 0 20px;
  }
  &.inputs {
    background-color: rgb(210, 210, 210);
    box-sizing: border-box;
    position: relative;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    .comment-write {
      background-color: #fff;
      width: 90%;
      height: 75%;
      display: flex;
      justify-content: center;
      align-items: center;
      textarea {
        width: 95%;
        height: 85%;
        font-size: 14px;
        font-family: Helvetica,Arial, Malgun Gothic, sans-serif;
      }
    }
    button {
      background-color: #fff;
      border: 2px solid #000;
      border-radius: 5px;
      width: 50px;
      height: 40px;
      cursor: pointer;
    }
  }
  &.comments {
    & > div {
      border-bottom: 1px solid rgb(190, 190, 190);
    }
    & > div:last-child {
      border: none;
    }
    padding: 20px;
    
    .comment {
      margin-bottom: 5px;
      &.top {
        display: flex;
        align-items: center;
        height: 30px;
        .comment-author {
          padding: 0 8px;
          width: 210px;
          font-weight: 700;
        }
        .comment-created {
          font-size: 12px;
        }
      }
      &.bottom {
        padding: 10px 8px;
        display: flex;
        .description {
          width: 630px;
        }
        .comment-delete {
          color: red;
          font-weight: 700;
          cursor: pointer;
        }
      }
    }
  }
}
</style>