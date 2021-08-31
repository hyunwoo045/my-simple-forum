<template>
  <div class="container">
    <div class="headline">
      기본정보입력
    </div>
    <div class="form">
      <div class="input">
        <input
          type="text"
          placeholder="이메일 주소  ex) xxxx@gmail.com" />
      </div>
      <div class="input">
        <input
          type="text"
          placeholder="닉네임" />
      </div>
      <div class="input">
        <input
          type="password"
          placeholder="비밀번호" />
      </div>
    </div>
    <div class="btn-area">
      <div class="btn">
        취소
      </div>
      <div class="btn">
        확인
      </div>
    </div>
    <div class="login">
      이미 회원이신가요? <RouterLink to="/login">
        <span class="link">로그인하기</span> 
      </RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.headline {
  height: 120px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  font-size: 24px;
  font-weight: 700;
}
.form {
  height: 200px;
  padding: 20px 30px;
  .input {
    margin-bottom: 30px;
    input {
      border: none;
      border-bottom: 1px solid gray;
      box-sizing: border-box;
      font-size: 16px;
      padding: 5px;
      height: 35px;
      width: 45%;
      &:focus {
        outline: none;
        border-bottom: 2px solid royalblue
      }
    }
  }
}
.btn-area {
  padding: 0 30px;
  height: 100px;
  display: flex;
  align-items: center;
  .btn {
    width: 145px;
    margin-right: 20px;
  }
}
.login {
  padding: 0 30px;
  height: 50px;
  .link {
    color: blue;
    text-decoration: underline;
    font-weight: 700;
  }
}
</style>