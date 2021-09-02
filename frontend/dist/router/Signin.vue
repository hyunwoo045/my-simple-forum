<template>
  <div class="container">
    <div class="headline">
      기본정보입력
    </div>
    <div class="form">
      <div
        class="input">
        <input
          class="e-mail"
          :class="emailErr ? 'errored' : ''"
          type="text"
          placeholder="이메일 주소  ex) xxxx@gmail.com"
          v-model="inputs.email"
          @focus="emailErr = false" />
        <div
          class="errmsg"
          v-if="emailErr">
          중복된 이메일입니다.
        </div>
      </div>
      <div class="input">
        <input
          class="nickname"
          :class="nicknameErr ? 'errored' : ''"
          type="text"
          placeholder="닉네임"
          v-model="inputs.nickname"
          @focus="nicknameErr = false" />
        <div
          class="errmsg"
          v-if="nicknameErr">
          중복된 닉네임입니다.
        </div>
      </div>
      <div class="input">
        <input
          type="password"
          placeholder="비밀번호"
          v-model="inputs.password" />
      </div>
    </div>
    <div class="btn-area">
      <RouterLink to="/login">
        <div class="btn">
          취소
        </div>
      </RouterLink>
      <div
        class="btn"
        @click="submitHandler">
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
import defaultAPI from '~/core/defaultAPI';
export default {
  data() {
    return {
      inputs: {
        email: '',
        nickname: '',
        password: '',
      },
      submitAvailable: false,
      emailErr: false,
      nicknameErr: false,
      passwordErr: false,
    }
  },
  methods: {
    submitHandler() {
      if (this.inputs.email === '') {
        alert('이메일을 입력하세요')
        return
      } else if (this.inputs.nickname === '') {
        alert('닉네임을 입력하세요')
        return 
      } else if (this.inputs.password === '') {
        alert('비밀번호를 입력하세요')
        return
      }

      this.$http.post(`${defaultAPI.end_point}/auth/register`,{ inputs: this.inputs })
      .then(res => {
        if (res.data === "DUP_EMAIL") {
          this.emailErr = true;
        } else if (res.data === "DUP_NICKNAME") {
          this.nicknameErr = true;
        } else if (res.data === "OK") {
          alert('회원가입에 성공하였습니다.');
          this.$router.push('/login');
        } else {
          throw res.data;
        }
      })
    }
  }
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
    box-sizing: border-box;
    width: 45%;
    height: 35px;
    .errored {
      border-bottom: 2px solid red;
    }
    .errmsg {
      padding: 3px 7px 0;
      font-size: 12px;
      color: red;
      font-weight: 700;
    }
    input {
      border: none;
      box-sizing: border-box;
      border-bottom: 1px solid gray;
      font-size: 16px;
      padding: 5px;
      height: 35px;
      width: 100%;
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