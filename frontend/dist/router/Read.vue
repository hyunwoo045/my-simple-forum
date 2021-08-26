<template>
  <div class="content-detail">
    <div class="container">
      <div class="content-area">
        <div class="read-title">
          {{ $route.params.title }}
        </div>
        <div class="read-description">
          {{ $route.params.description }}
        </div>
      </div>
    </div>

    <div class="container">
      <div class="content-detail comment-area">
        <div class="content-detail comment-area label">
          댓글
        </div>

        <div class="content-detail comment-area inputs">
          <div class="comment-write">
            <textarea
              class="comment-write-inner"></textarea>
          </div>
          <button>작성</button>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="button-area">
      <button @click="modifyHandler">
        수정
      </button>
      <button @click="deleteHandler">
        삭제
      </button>
    </div> -->
    


  <!-- <div class="comments-area">
      <div class="comments-area label">
        댓글
      </div>
      <div class="comments-area comments">
        <div
          class="comment"
          v-for="(comment, idx) in comments"
          :key="idx">
          <div class="comment author">
            {{ comment.author }}
          </div>
          <div class="comment description">
            {{ comment.description }}
          </div>
          <div class="comment modify">
            <button @click="commentModify(comment.id)">
              수정
            </button>
          </div>
          <div class="comment delete">
            <button @click="commentDelete(comment.id)">
              삭제
            </button>
          </div>
        </div>
      </div>

      <div class="comments-area input-comments">
        <input
          type="text"
          placeholder="작성자"
          v-model="commentAuthor" />
        <input
          type="text"
          v-model="commentDescription"
          placeholder="내용" />
        <button @click="addComment">
          댓글 쓰기
        </button>
      </div>
    </div> -->
</template>

<script>
import defaultAPI from '~/core/defaultAPI'
export default {
  created() {
    /* LOAD COMMENTS */
    this.$http.get(`${defaultAPI.end_point}/comment?id=${this.$route.params.id}`).then(response => {
      console.log('READ', response)
      this.comments = response.data;
    })
  },
  data() {
    return {
      comments: [],
      commentAuthor: '',
      commentDescription: '',
    }
  },
  methods: {
    modifyHandler() {
      let id = this.$route.params.id;
      let title = this.$route.params.title;
      let description = this.$route.params.description;

      this.$router.push({
        name: 'Add',
        params: {
          mode: 'modify',
          contentId: id,
          title,
          description,
        },
      })
    },
    async deleteHandler() {
      let id = this.$route.params.id;
      await this.$http.post(`${defaultAPI.end_point}/content/delete`, { id }).then(response => {
        console.log(response)
      })
      this.$router.push('/')
    },
    addComment() {
      this.$http.post(`${defaultAPI.end_point}/comment/create`, {
        author: this.commentAuthor,
        description: this.commentDescription,
        content_id: this.$route.params.id
      }).then(response => {
        console.log(response)
      });
      
      this.$http.get(`${defaultAPI.end_point}/comment?id=${this.$route.params.id}`)
      .then(response => {
        console.log('READ', response)
        this.comments = response.data;
      })
    },
    commentModify(id) {
      console.log(id, '댓글 수정')
    },
    commentDelete(id) {
      console.log(id, '댓글 삭제')
      this.$http.post(`${defaultAPI.end_point}/comment/delete`, {
        id
      }).then(response => {
        console.log(response);
      });

      this.$http.get(`${defaultAPI.end_point}/comment?id=${this.$route.params.id}`)
      .then(response => {
        console.log('READ', response)
        this.comments = response.data;
      })
    }
  }
}
</script>

<style lang="scss">
@import '~/scss/main';
.container {
  margin-bottom: 30px;
}

.comment-area {
  &.label {
    height: 60px;
    display: flex;
    align-items: center;
    font-size: 20px;
  }
  &.inputs {
    background-color: rgb(236, 236, 236);
    box-sizing: border-box;
    .comment-write {
      padding: 10px 0;
      height: 200px;
      position: relative;
      textarea {
        width: 100%;
        height: 80%;
        font-size: 14px;
        font-family: Helvetica,Arial, Malgun Gothic, sans-serif;
      }
      button {
        position: relative;
        right: 0;
        top: 0;
      }
    }
  }
}
</style>