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
          v-model="curName" />
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
      <div class="btn search-my">
        내가 쓴 글
      </div>
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
      padding: 0 8px;
      font-size: 19px;
      width: 140px;
      margin-right: 30px;
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
      margin-right: 30px;
      cursor: pointer;
      &.write {
        background-color: rgb(0, 165, 0);
        color: white;
        text-decoration: none;
      }
    }
  }
}
</style>