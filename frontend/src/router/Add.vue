<template>
  <div class="container">
    <div class="input-area mode">
      {{ mode === 'modify' ? "글 수정" : "글 생성" }}
    </div>
    <div class="input-area top">
      <input
        v-model="author"
        type="text"
        class="name"
        placeholder="닉네임" />
    </div>
    <div class="input-area title">
      <input
        v-model="curTitle"
        type="text"
        class="title"
        placeholder="제목" />
    </div>
    <div class="input-area description">
      <textarea
        v-model="curDesc"
        class="description"></textarea>
    </div>
    
    <div class="button-area">
      <button
        class="cancel"
        @click="back">
        취소
      </button>
      <button
        class="submit"
        @click="createHandler">
        확인
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Add',
  props: {
    mode: {
      type: String,
      default: '',
    },
    contentId: {
      type: Number,
      default: -1,
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      author: '',
      curTitle: this.title,
      curDesc: this.description,
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    createHandler() {
      this.$http.post('/api/create', {
        mode: this.mode,
        id: this.contentId,
        author: this.author,
        title: this.curTitle,
        description: this.curDesc,
      }).then(response => {
        console.log(response.data);
        this.$router.push('/');
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/scss/main';

.container {
  padding: 20px 20px;
  box-sizing: border-box;
  width: 85%;
  height: 75vh;
  .input-area {
    margin-bottom: 8px;
    // &:last-child {
    //   margin-bottom: 0;
    // }
    & > input {
      margin-right: 8px;
    }
    & > .title {
      width: 500px;
    }
    & > .description {
      width: 500px;
      height: 400px;
    }
  }
  button {
    margin-right: 8px;
  }
}

</style>