<template>
  <div class="userbox">
    <div class="user-info">
      <div
        class="username"
        v-if="!toggler">
        {{ username }}
      </div>
      <div
        class="username change"
        v-else>
        <input
          type="text"
          maxlength="11"
          v-model="curName"
          @keyup.enter="toggleUsername" />
      </div>
      <div
        class="change-username"
        @click="toggleUsername">
        수정
      </div>
    </div>

    <div class="button-area">
      <RouterLink
        class="btn write"
        :to="{ name: 'Add', params: { mode: 'add' } }">
        글쓰기
      </RouterLink>
      <div
        class="btn search-my"
        @click="searchMyContents">
        내가 쓴 글
      </div>
      <div
        class="btn search-all"
        @click="searchAllContents">
        전체 글
      </div>
    </div>
  </div>
</template>

<script>
import defaultAPI from '~/core/defaultAPI'
export default {
  created() {
    this.curName = this.$store.state.user.username;
  },
  data() {
    return {
      toggler: false,
      curName: '',
    }
  },
  computed: {
    username() {
      return this.$store.state.user.username;
    }
  },
  methods: {
    toggleUsername() {
      if (this.toggler) {
        this.$store.commit('user/setUsername', {
          newName: this.curName
        });
      }
      this.toggler = !this.toggler;
    },
    searchMyContents() {
      this.$http.get(`${defaultAPI.end_point}/content/get_by_author?author=${this.$store.state.user.username}`).then(response => {
        this.$store.commit('user/setContents', {
          contents: response.data,
        });
        this.$router.push('/');
      })
    },
    searchAllContents() {
      this.$http.get(`${defaultAPI.end_point}/content`).then(response => {
        this.$store.commit('user/setContents', {
          contents: response.data,
        });
        this.$router.push('/');
      })
    }
  }
  
}
</script>

<style lang="scss" scoped>
.userbox {
  margin: 0 auto;
  width: 300px;
  height: 180px;
  background-color: #fff;
  padding: 15px;
  box-sizing: border-box;
  .user-info {
    height: 70px;
    display: flex;
    align-items: center;
    .username {
      padding: 0 20px;
      font-size: 19px;
      width: 190px;
      box-sizing: border-box;
      &.change {
        input {
          height: 25px;
          font-size: 19px;
          width: 140px;
        }
      }
    }
    .change-username {
      font-size: 14px;
      cursor: pointer;
    }
  }

  .button-area {
    display: flex;
    position: relative;
    .btn {
      border: 1px solid black;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 90px;
      height: 40px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 700;
      margin-right: 4px;
      &:last-child {
        margin: 0;
      }
      &.write {
        background-color: rgb(0, 165, 0);
        color: white;
        text-decoration: none;
      }
    }
  }
}
</style>