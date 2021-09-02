<template>
  <div class="userbox">
    <div class="user-info">
      <div
        class="username"
        v-if="!toggler">
        {{ $store.state.user.isLoggedIn ? username : '로그인이 필요합니다.' }}
      </div>
    </div>

    <div class="button-area">
      <div
        class="btn"
        @click="searchAllContents">
        전체 글
      </div>
      <div
        class="btn"
        v-if="$store.state.user.isLoggedIn"
        @click="searchMyContents">
        내가 쓴 글
      </div>
      <RouterLink
        class="btn green"
        v-if="$store.state.user.isLoggedIn"
        :to="{ name: 'Add', params: { mode: 'add' } }">
        글쓰기
      </RouterLink>
    </div>
  </div>
</template>

<script>
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
      this.$router.push({
        name: "Home",
        query: {
          user_id: this.$store.state.user.id,
        }
      });
    },
    searchAllContents() {
      this.$router.push('/')
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
      margin-right: 4px;
      &:last-child {
        margin: 0;
      }
    }
  }
}
</style>