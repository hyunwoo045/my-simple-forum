<template>
  <div class="container">
    세션 확인 중입니다. 잠시만 기다려 주세요
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
    if (!token) {  // localStorage 에 토큰이 없으면 (= 로그인이 안되어 있으면)
      this.$store.state.user.tokenChecked = true;
      this.$router.go(-1);
    } else {
      /*
        ACCESS TOKEN 검증
        - 검증되면 새로운 AccessToken과 RefreshToken을 발급해줌. 토큰 유효 시간을 초기화하기 위함.
      */
      this.$http.get(`${defaultAPI.end_point}/auth/check?token=${token}`)
      .then(response => {
        const data = response.data;
        if (data.message === "VALID_TOKEN") {
          const nickname = data.decoded.nickname;
          const user_id = data.decoded.user_id;
          this.$store.commit('user/setState', { nickname, user_id });
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          this.$store.state.user.tokenChecked = true;
          this.$router.go(-1);

        } else if (data.message === "NOT_VALID_ACCESS_TOKEN") {
          /*
            REFRESH TOKEN 검증
            - 검증되면 새로운 AccessToken과 RefreshToken을 발급해줌.
          */
          const curRefreshToken = localStorage.getItem('refreshToken');
          this.$http.get(`${defaultAPI.end_point}/auth/check_refresh?token=${curRefreshToken}`).then(response => {
            const data = response.data;
            if (data.message === "VALID_REFRESH_TOKEN") {
              const nickname = data.decoded.nickname;
              const user_id = data.decoded.user_id;
              this.$store.commit('user/setState', { nickname, user_id });
              localStorage.setItem('accessToken', data.accessToken);
              localStorage.setItem('refreshToken', data.refreshToken);
              this.$store.state.user.tokenChecked = true;
              this.$router.go(-1);
            } else {
              /*
                TOKEN 모두 만료
              */
              alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
              this.$store.state.user.tokenChecked = true;
              this.$store.commit('user/resetState');
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              this.$router.go(-1);
            }
          })
        } else {
          this.$store.state.user.tokenChecked = true;
          this.$router.go(-1);
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>