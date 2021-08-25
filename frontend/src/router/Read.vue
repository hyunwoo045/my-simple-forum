<template>
  <div class="container">
    <div class="button-area">
      <button @click="modifyHandler">
        수정
      </button>
      <button @click="deleteHandler">
        삭제
      </button>
    </div>
    
    <div class="content-area">
      <div class="read-title">
        {{ $route.params.title }}
      </div>
      <div class="read-description">
        {{ $route.params.description }}
      </div>
    </div>

    <div class="comments-area">
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
      <!-- 댓글 쓰기 -->
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$http.get(`/api/read?id=${this.$route.params.id}`).then(response => {
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
      await this.$http.post('/api/delete', { id }).then(response => {
        console.log(response)
      })
      this.$router.push('/')
    },
    addComment() {
      this.$http.post('/api/addcomment', {
        author: this.commentAuthor,
        description: this.commentDescription,
        content_id: this.$route.params.id
      }).then(response => {
        console.log(response)
      });
      
      this.$http.get(`/api/read?id=${this.$route.params.id}`)
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
      this.$http.post('/api/comment/delete', {
        id
      }).then(response => {
        console.log(response);
      });

      this.$http.get(`/api/read?id=${this.$route.params.id}`)
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
  width: 85%;
  height: 75vh;
  .content-area {
    padding: 0 10px;
    .read-title {
      height: 75px;
      display: flex;
      align-items: center;
    }
    .read-description {
      height: 300px;
    }
  }
  
  button {
    margin-right: 5px;
  }
  .comments-area {
    .comments-area.comments {
      .comment {
        display: flex;
        &.author {
          width: 100px;
        }
        &.description {
          width: 500px;
        }
      }
    }
  }
}
</style>