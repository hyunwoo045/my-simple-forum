<template>
  <div class="container">
    <div class="headline">
      로그인해서 글을 작성하고 댓글도 달아보세요!
    </div>
    <div class="login">
      <div class="form">
        <div class="id">
          <div class="label">
            아이디
          </div> <input type="text" />
        </div>
        <div class="password">
          <div class="label">
            비밀번호
          </div> <input type="text" />
        </div>
      </div>
      <div class="submit">
        <div class="btn">
          로그인
        </div>
      </div>
    </div>
    <div class="signin">
      <RouterLink to="/signin">
        <div class="btn red">
          회원가입 하기
        </div>
      </RouterLink>
      <div class="btn">
        GOOGLE 로 로그인
      </div>
      <div class="btn">
        FACEBOOK 으로 로그인
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
@import "~/scss/main";

.headline {
  height: 250px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid gray;
}
.login {
  display: flex;
  justify-content: center;
  padding: 20px 0;
  border-bottom: 1px solid gray;
  .form {
    width: 40%;
    .id, .password, .submit {
      height: 50px;
      display: flex;
      align-items: center;
      .label {
        width: 80px;
        font-weight: 700;
      }
    }
  }
  .submit {
    display: flex;
    align-items: center;
    .btn {
      width: 80px;
      height: 80px;
    }
  }
}
.signin {
  padding: 30px 0;
  .btn {
    width: 300px;
    margin: 0 auto 20px;
  }
}

</style>