<template>
  <div class="message">
    잠시만 기다려 주세요~
  </div>
</template>

<script>
import defaultAPI from '~/core/defaultAPI'
export default {
  created() {
    /* 
      로그인 세션 확인하기
    */
    const token = localStorage.getItem('accessToken');
    this.$http.get(`${defaultAPI.end_point}/auth/check?token=${token}`)
    .then(response => {
      const data = response.data;
      if (data.message === "VALID_TOKEN") {
        const nickname = data.decoded.nickname;
        const user_id = data.decoded.user_id;
        this.$store.commit('user/setState', { nickname, user_id });
        // ACCESS TOKEN 다시 받아야 함.

        this.$router.go(-1);
      } else if (data.message === "NOT_VALID_ACCESS_TOKEN") {
        // REFRESH 토근 확인하고 분기 나눠야 함.
        this.$store.state.user.tokenChecked = true;
        this.$router.go(-1);
      } else {
        this.$store.state.user.tokenChecked = true;
        this.$router.go(-1);
      }
    })
  }
}
</script>

<style lang="scss" scoped>

</style>