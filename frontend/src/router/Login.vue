<template>
  <div class="container">
    <div class="headline">
      로그인해서 글을 작성하고 댓글도 달아보세요!
    </div>
    <div class="login">
      <div class="form">
        <div class="errmsg">
          {{ emailErr ? '이메일을 입력하세요.' 
            : passwordErr ? '패스워드를 입력하세요.' 
              : inputErr ? '잘못된 정보 입력입니다.'
                :'' }}
        </div>
        <div class="id">
          <div class="label">
            이메일
          </div> <input
            type="text"
            v-model="inputs.email"
            @focus="resetStatus" />
        </div>
        <div class="password">
          <div class="label">
            비밀번호
          </div> <input
            type="password"
            v-model="inputs.password"
            @focus="resetStatus" />
        </div>
      </div>
      <div class="submit">
        <div
          class="btn"
          @click="loginHandler">
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
import defaultAPI from '~/core/defaultAPI';
export default {
  data() {
    return {
      inputs: {
        email: '',
        password: '',
      },
      emailErr: false,
      passwordErr: false,
      inputErr: false,
    }
  },
  methods: {
    loginHandler() {
      if (this.inputs.email === '') {
        this.emailErr = true;
        return;
      } else if (this.inputs.password === '') {
        this.passwordErr = true;
        return;
      }
      this.$http.post(`${defaultAPI.end_point}/auth/login`, 
      { 
        email: this.inputs.email,
        password: this.inputs.password,
      }).then(response => {
        console.log(response);
        if (response.data === "NOT_FOUND_EMAIL") {
          this.inputErr = true;
          this.resetInputs();
        } else if (response.data === "NOT_VALID_PASSWORD") {
          this.inputErr = true;
          this.resetInputs();
        } else {
          /*
            여기서부터 JWT token을 사용하기 시작해야 함.
            localStorage 를 이용해서 Session을 유지해야 함.
          */
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken)
          const userPayload = {
            user_id: response.data.user_id,
            nickname: response.data.nickname,
          }
          alert('로그인 성공!');
          this.$store.commit('user/setState', userPayload)
          this.$router.push('/');
        }
      })
    },
    resetStatus() {
      this.emailErr = false;
      this.passwordErr = false;
      this.inputErr = false;
    },
    resetInputs() {
      this.inputs.email = '';
      this.inputs.password = '';
    },
  }
}
</script>

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
.login {
  display: flex;
  justify-content: center;
  padding: 20px 0;
  border-bottom: 1px solid gray;
  .form {
    width: 40%;
    .errmsg {
      font-size: 12px;
      color: red;
      font-weight: 700;
    }
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