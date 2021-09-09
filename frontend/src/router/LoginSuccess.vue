<template>
  <div>구글 아이디로 로그인 합니다. 잠시만 기다려 주세요</div>
</template>

<script>
import defaultAPI from "~/core/defaultAPI";

export default {
  created() {
    const { id, nickname } = this.$route.query;
    this.$http
      .post(`${defaultAPI.end_point}/auth/login`, { id, nickname })
      .then((res) => {
        console.log(res);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);

        this.$store.commit("user/setState", { user_id: id, nickname });
        this.$router.push("/");
      });
  },
};
</script>
