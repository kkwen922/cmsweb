<template>
  <div class="htmlBox">
    <el-card class="login_center">

      <el-form autoComplete="on"
               :model="loginForm"
               :rules="loginRules"
               ref="loginForm"
               label-position="left">

        <h1 class="login-title">Login</h1>
        <br><br>

        <div className='login__field'>
          <Label style="font-size:18px;color:white;">Username</Label>
          <el-form-item prop="username">
            <el-input style="font-size:18px" name="username"
                      type="text"
                      v-model="loginForm.username"
                      autoComplete="on"
                      placeholder="請輸入用戶名稱">

          <span slot="prefix">
            <svg-icon icon-class="user" class="color-main"></svg-icon>
          </span>


            </el-input>
          </el-form-item>
        </div>

        <div className='login__field'>
          <Label style="font-size:18px;color:white">Password</Label>
          <el-form-item prop="password">
            <el-input style="font-size:18px" name="password"
                      :type="pwdType"
                      @keyup.enter.native="handleLogin"
                      v-model="loginForm.password"
                      autoComplete="on"
                      placeholder="請輸入密碼">

          <span slot="prefix">
            <svg-icon icon-class="password" class="color-main"></svg-icon>
          </span>

              <span slot="suffix" @click="showPwd">
            <svg-icon icon-class="eye" class="color-main"></svg-icon>
          </span>

            </el-input>

          </el-form-item>

        </div>

        <br>
        <el-form-item style="margin-bottom: 60px;text-align: center">
          <el-button style="width: 45%" type="primary" :loading="loading" @click.native.prevent="handleLogin">
            Submit
          </el-button>
        </el-form-item>

      </el-form>
    </el-card>


    <footer class="footer" style="font-size: 12px; text-align: right">
      Copyright © 2021 亞太電信 版權所有
      <a style="color:white" href="#/PrivacyPolicy">隱私權及網站安全政策</a>
    </footer>
  </div>
</template>

<script>
import {isValidUsername} from '@/utils/validate';
import {setSupport, getSupport, setCookie, getCookie} from '@/utils/support';
// import login_center_bg from '@/assets/images/login_center_bg.png'

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isValidUsername(value)) {
        callback(new Error('請輸入正確帳號'))
      } else {
        callback()
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 8 && value.length > 14) {
        callback(new Error('密碼長度介於8~13'))
      } else {
        callback()
      }
    };
    return {
      loginForm: {
        username: '',
        password: '',
      },
      loginRules: {
        username: [{required: true, trigger: 'blur', validator: validateUsername}],
        password: [{required: true, trigger: 'blur', validator: validatePass}]
      },
      loading: false,
      pwdType: 'password',
      dialogVisible: false,
      supportDialogVisible: false
    }
  },
  created() {
    this.loginForm.username = getCookie("username");
    this.loginForm.password = getCookie("password");
    if (this.loginForm.username === undefined || this.loginForm.username == null || this.loginForm.username === '') {
      this.loginForm.username = '';
    }
    if (this.loginForm.password === undefined || this.loginForm.password == null) {
      this.loginForm.password = '';
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },

    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false;
            setCookie("username", this.loginForm.username, 15);
            setCookie("password", this.loginForm.password, 15);
            this.$router.push({path: '/'})
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('參數驗證失敗！');
          return false
        }
      })
    },

    handleTry() {
      this.dialogVisible = true
    },
    dialogConfirm() {
      this.dialogVisible = false;
      setSupport(true);
    },
    dialogCancel() {
      this.dialogVisible = false;
      setSupport(false);
    }
  }
}


</script>

<style scoped>
.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  width: 80%;

  margin: 10% auto;;
  vertical-align: center;
  border-top: 10px solid #fcfeff;
}

.login-title {
  text-align: center;
  color: white;
}

.login-center-layout {
  /*background: #144a87;*/
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-top: 200px;
  /*background-color: #5d9df0;*/
}

.htmlBox {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  /*background-color: #144a87;*/
  background-image: linear-gradient(to right bottom, #ff0000, #ffa500, #ffff00, #008000, #0000ff, #4b0082, #9400d3);

}

.login_center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 91%;
  max-width: 400px;
  padding: 40px;
  /*background: rgba(0, 0, 0, .8);*/
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, .5);
  border-radius: 10px;
  background: rgba(103, 134, 35, 0.8);
}

.login {
  position: relative;
  width: 100%;
  height: 100%;
  font-family: sans-serif;
  /*background: url(bg.jpg) no-repeat center 0px;*/
  /*background-attachment: scroll;*/
  /*background-size: auto;*/
  /*background-size: cover;*/
  /*background-attachment: fixed;*/
  top: 0;
  left: 0;
}

.login__center .login__field {
  position: relative;
}

.footer {
  display: block;
  position: fixed;
  bottom: -5px;
  padding: 0.25em 0.5em;
  width: 100%;
  background: #212529;
  color: #ffffff;
  font-size: 14px;
  line-height: 1.8;
  border-bottom: 5px solid #2196f3;
  z-index: 999;
}
</style>
