<template>
  <div>구글 아이디로 로그인 합니다. 잠시만 기다려 주세요</div>
</template>

<script>
export default {
  created() {
    const { id, nickname, token } = this.$route.query;
    localStorage.setItem("googleToken", token);

    this.$store.commit("user/setState", { user_id: id, nickname });

    console.log({ id, nickname, token });
    console.log(this.$store.state.user.username);
    console.log(this.$store.state.user.isLoggedIn);
    this.$router.push("/");
  },
};
</script>
