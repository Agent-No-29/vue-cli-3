<template>
  <div class="login-page" id="canvasParticle">
    <div class="login-container">
      <div class="login-dialog">
        <div class="login-wrapper">
          <div class="login-logo"></div>
          <div class="login-title" v-html="appName"></div>
          <div class="login-content">
            <div class="login-box" v-show="loginBox">
              <el-form ref="loginForm" :model="lf" labelWidth="0">
                <el-row>
                  <el-form-item
                      label=""
                      prop="loginCode"
                      :rules="[{ required: true, type:'string',message: '请输入账号',trigger: 'change'}]">
                    <el-input
                        v-model.trim="lf.loginCode"
                        placeholder="账号"
                        :maxlength="20"
                        :autofocus="true"
                        @keyup.enter.native="doLogin">
                      <template slot="append">
                        <i class="login-name" aria-hidden="true"></i>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item
                      label=""
                      prop="loginPasswd"
                      :rules="[{ required: true, type:'string',message: '请输入登录密码',trigger: 'change' }]">
                    <el-input
                        v-model.trim="lf.loginPasswd"
                        placeholder="密码"
                        type="password"
                        :maxlength="20"
                        @keyup.enter.native="doLogin">
                      <template slot="append">
                        <i class="login-key" aria-hidden="true"></i>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item
                      label=""
                      prop="verifyCode"
                      :rules="[{ required: verifyCodeNeeded, type:'string',message: '请输入验证码',trigger: 'change' }]">
                    <el-input
                        class="verify-code"
                        v-model.trim="lf.verifyCode"
                        placeholder="验证码"
                        :maxlength="4"
                        @keyup.enter.native="doLogin">
                      <template slot="append"></template>
                      <template slot="append">
                        1234
                      </template>
                    </el-input>
                  </el-form-item>
                </el-row>
              </el-form>
              <div class="login-btn">
                <el-button type="primary" @click="doLogin" :disabled="loging" class="login-button">
                  <template v-if="loging"><i class="el-icon-loading"></i></template>
                  <template v-else>登 录</template>
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'

  export default {
    data() {
      return {
        changePasswd: {
          newPasswd: '',
          confirmNewPasswd: '',
        },
        loginBox: true,
        appName: '',
        lf: {
          loginCode: '',
          loginPasswd: '',
          verifyCode: '',
          rememberMe: false
        },
        verifyCodeNeeded: true,
        loging: false,
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.setCanvas();
      })
    },
    methods: {
      ...mapActions(['getUserInfo']),
      setCanvas() {
        var config = {
          vx: 4,
          vy: 4,
          height: 4,
          width: 4,
          count: 230,
          color: "37,82,94",
          stroke: "86, 191, 218",
          dist: 7000,
          e_dist: 20000,
          max_conn: 10
        }
        this.$util.canvasParticle(config);
      },
      doLogin() {
        this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            this.$router.push('/');
            this.getUserInfo();
          }
        })
      }
    }
  }
</script>
<style>
  .login-page {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .login-page canvas {
    z-index: 1 !important;
  }

  .login-container {
    width: 300px;
    z-index: 2;
    position: absolute;
    top: calc(50% - 20px);
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .login-content {
    padding: 108px 52px 35px 52px;
    box-sizing: border-box;
    height: 430px;
    border-radius: 4px;
  }

  .login-content i {
    display: inline-block;
    width: 18px;
    height: 18px;
  }

  .login-content .login-name {
    background: url('../assets/image/login-name.png') no-repeat center;
  }

  .login-content .login-key {
    background: url('../assets/image/login-key.png') no-repeat center;
  }

  .login-container .el-button {
    height: 34px;
    width: 100%;
    border-radius: 4px;
  }

  .login-container .el-button span {
    font-size: 16px;
  }

  .login-container .el-input-group__append,
  .login-container .el-input-group__prepend {
    background-color: #fff;
    border: 1px solid #BCBCBC;
    border-left: none;
    padding-right: 10px;
    padding-left: 10px;
  }

  .login-container .el-form-item.is-success .el-input__inner,
  .login-container .el-form-item.is-success .el-input__inner:focus,
  .login-container .el-form-item.is-error .el-input__inner,
  .login-container .el-form-item.is-error .el-input__inner:focus,
  .login-container .el-message-box__input input.invalid,
  .login-container .el-message-box__input input.invalid:focus,
  .login-container .el-input.is-active .el-input__inner,
  .login-container .el-input__inner,
  .login-container .el-input__inner:focus {
    height: 34px;
    line-height: 34px;
    border-radius: 4px 0 0 4px;
    border: 1px solid #BCBCBC;
    box-sizing: border-box;
    border-right: none;
    background-color: transparent;
  }

  .login-container .el-form-item {
    margin-bottom: 15px;
  }

  .login-container .el-form-item__content {
    line-height: normal;
  }

  .login-container .company-name span {
    color: #fff;
  }

  .login-container .company-name {
    position: absolute;
    bottom: -264px;
    font-size: 12px;
    margin: 0 auto;
    left: 50%;
    transform: translate(-50%);
    width: 265px;
  }

  .login-container ::-webkit-input-placeholder { /* WebKit browsers */
    color: #999 !important;
  }

  .login-container :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #999 !important;
  }

  .login-container ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #999 !important;
  }

  .login-container :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #999 !important;
  }
</style>
