<template>
  <div>구글 아이디로 로그인 합니다. 잠시만 기다려 주세요</div>
</template>

<script>
import defaultAPI from "~/core/defaultAPI";
import VueCookies from "vue-cookies";

export default {
  created() {
    if (!VueCookies.isKey("id") && !VueCookies.isKey("nickname")) {
      alert("잘못된 접근입니다.");
      this.$router.push("/login");
    } else {
      const id = VueCookies.get("id");
      const nickname = VueCookies.get("nickname");

      this.$http
        .post(`${defaultAPI.end_point}/auth/login`, { id, nickname })
        .then((res) => {
          console.log(res);
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          this.$store.commit("user/setState", { id, nickname });
          VueCookies.keys().forEach((cookie) => VueCookies.remove(cookie));
          this.$router.push("/");
        });
    }
  },
};
</script>
