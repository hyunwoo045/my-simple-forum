<template>
  <div>구글 아이디로 로그인 합니다. 잠시만 기다려 주세요</div>
</template>

<script>
import VueCookies from "vue-cookies";

export default {
  created() {
    // if (!VueCookies.isKey("id") && !VueCookies.isKey("nickname")) {
    //   alert("잘못된 접근입니다.");
    //   this.$router.push("/login");
    // } else {
    //   const id = VueCookies.get("id");
    //   const nickname = VueCookies.get("nickname");

    //   this.$http
    //     .post(`${defaultAPI.end_point}/auth/login`, { id, nickname })
    //     .then((res) => {
    //       console.log(res);
    //       localStorage.setItem("accessToken", res.data.accessToken);
    //       localStorage.setItem("refreshToken", res.data.refreshToken);
    //       this.$store.commit("user/setState", { id, nickname });
    //       VueCookies.keys().forEach((cookie) => VueCookies.remove(cookie));
    //       this.$router.push("/");
    //     });
    // }

    if (!VueCookies.isKey("accessToken") && !VueCookies.isKey("refreshToken")) {
      alert("잘못된 접근입니다.");
      this.$router.push("/login");
    } else {
      localStorage.setItem("accessToken", VueCookies.get("accessToken"));
      localStorage.setItem("refreshToken", VueCookies.get("refreshToken"));
      VueCookies.keys().forEach((cookie) => VueCookies.remove(cookie));

      this.$store.dispatch("user/AccessTokenHandler").then((res) => {
        if (res === "NOT_VALID_ACCESS_TOKEN") {
          this.$store.dispatch("user/RefreshTokenHandler").then((res) => {
            if (res === "NOT_VALID_REFRESH_TOKEN") {
              this.$store.commit("/user/resetState");
              alert("세션이 만료되었습니다.");
              this.$router.push("/login");
            } else {
              this.$router.push("/");
            }
          });
        } else if (res === "NEED_LOGIN") {
          this.$store.commit("/user/resetState");
          this.$router.push("/login");
        } else {
          this.$router.push("/");
        }
      });
    }
  },
};
</script>
