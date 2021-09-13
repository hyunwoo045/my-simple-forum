<template>
  <div class="userbox">
    <div class="user-info">
      <div class="username">
        {{ username }}
      </div>
    </div>
    <div class="button-area">
      <div class="btn" @click="searchAllContents">전체 글</div>
      <div class="btn" @click="searchMyContents">내가 쓴 글</div>
      <router-link
        class="btn green"
        :to="{ name: 'Add', params: { mode: 'add' } }"
      >
        글쓰기
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    username() {
      return this.$store.state.user.nickname;
    },
  },
  methods: {
    searchMyContents() {
      this.$router.push({
        name: "Container",
        query: {
          user_id: this.$store.state.user.id,
        },
      });
    },
    searchAllContents() {
      this.$router.push("/");
    },
  },
};
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
