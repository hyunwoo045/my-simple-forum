<template>
  <div>소셜 로그인에 성공하였습니다. 잠시만 기다려 주세요</div>
</template>

<script>
import VueCookies from "vue-cookies";

export default {
  created() {
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
              alert("세션이 만료되었거나 올바른 접근이 아닙니다.");
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
