<template>
  <div class="container">
    <div class="headline">로그인해서 글을 작성하고 댓글도 달아보세요!</div>
    <div class="signin">
      <a href="http://localhost:3000/api/auth_social/google">
        <div class="btn">GOOGLE 로 로그인</div>
      </a>
      <a href="http://localhost:3000/api/auth_social/kakao"
        ><div class="btn">KAKAO 로 로그인</div>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main";

.container {
  margin-top: 150px;
}
.headline {
  height: 250px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid gray;
}
.signin {
  padding: 30px 0;
  .btn {
    width: 300px;
    margin: 0 auto 20px;
  }
}
</style>
