<template>
  <div class="container">
    <div class="input-area">
      <div class="mode-label">
        {{ mode === 'modify' ? "수정" : "생성" }}
      </div>

      <div class="title">
        <input
          type="text"
          v-model="curTitle"
          placeholder="제목을 입력하세요." />
      </div>

      <div class="description">
        <textarea
          v-model="curDesc"
          class="description"
          placeholder="내용을 입력하세요."></textarea>
      </div>
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
import defaultAPI from '~/core/defaultAPI';
export default {
  created() {
    /*
      글 쓰기/생성 페이지에서는 새로고침 시 즉시 홈 화면으로 날아갑니다.
    */
    if (!this.$store.state.user.isLoggedIn && !this.$store.state.user.tokenChecked) {
      this.$router.push('/');
    }
  },
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
      curTitle: this.title,
      curDesc: this.description,
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    createHandler() {
      if (this.curTitle === '') {
        alert('제목을 입력하세요.');
        return;
      } else if (this.curDesc === '') {
        alert('내용을 입력하세요.');
        return;
      }
      
      let url = ''
      if (this.mode === 'modify') {
        url = `${defaultAPI.end_point}/content/modify`
      } else {
        url = `${defaultAPI.end_point}/content/create`
      }

      this.$http.post(url, {
        id: this.contentId,
        user_id: this.$store.state.user.id,
        title: this.curTitle,
        description: this.curDesc,
      }).then(() => {
        this.$router.push('/');
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/scss/main';
.input-area {
  .mode-label {
    height: 50px;
    display: flex;
    align-items: center;
    padding: 13px 20px 0;
    font-size: 22px;
    font-weight: 700;
  }
  .title {
    padding: 10px;
    height: 45px;
    input {
      height: 80%;
      width: 95%;
      padding: 0 10px;
      border: 1px solid rgb(134, 134, 134); 
      border-radius: 4px;
    }
  }
  .description {
    padding: 0 10px;
    height: 45vh;
    
    textarea {
      padding: 10px;
      width: 95%;
      height: 95%;
      border: 1px solid rgb(134, 134, 134);
      border-radius: 4px;
    }
    textarea:focus {
      border: 2px solid black;
    }
  }
}
.button-area {
  padding: 10px 10px;
  margin-top: 10px;
  position: relative;
  button {
    height: 40px;
    width: 90px;
    font-size: 14px;
    color: rgb(110, 110, 110);
    background-color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .cancel {
    border: 0.5px solid gray;
  }
  .submit {
    position: absolute;
    right: 24px;
    background-color: rgb(33, 167, 62);
    color: #fff;
  }
}
</style>