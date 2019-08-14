<template>
  <div class="login-wrapper">
    <div class="login">
      <div class="login-header">
        <h3 class="main-title">欢迎登录</h3>
        <!-- <p class="desc">gBlog的后台管理</p> -->
      </div>
      <el-form
        :model="user"
        ref="user"
        :rules="rules"
        class="login-form"
      >
        <el-form-item prop="name">
          <el-input
            :autofocus="true"
            placeholder="请输入用户名"
            v-model="user.name"
          >
            <template slot="prepend">
              <i class="el-icon-user-solid"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="user.password"
            autocomplete="off"
          >
            <!-- <span class="pwd-show">
              <svg-icon icon-class="eye-close" />
            </span> -->
            <template slot="prepend">
              <i class="el-icon-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="submit"
            type="primary"
            @click="handleSubmit('user')"
          >{{ btnText}}</el-button>
        </el-form-item>
      </el-form>
      <hr>
      <p>还没有账号，马上去<span
          class="to"
          @click="toRegister"
        >注册</span></p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        name: '',
        password: '',
      },
      btnText: '登录',
      rules: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
      },
    };
  },
  methods: {
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('初验成功');
        } else {
          return false;
        }
        return true;
      });
    },
    toRegister() {
      this.$router.push({
        name: 'register',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.icon {
  display: block;
  height: 100px;
  line-height: 100px;
  font-size: 14px;
  margin: 10px auto;
  color: #333;
  -webkit-transition: font-size 0.25s linear, width 0.25s linear;
  -moz-transition: font-size 0.25s linear, width 0.25s linear;
  transition: font-size 0.25s linear, width 0.25s linear;
}
.svg-icon {
  /* 通过设置 font-size 来改变图标大小 */
  width: 1em;
  /* 图标和文字相邻时，垂直对齐 */
  vertical-align: -0.15em;
  /* 通过设置 color 来改变 SVG 的颜色/fill */
  fill: currentColor;
  /* path 和 stroke 溢出 viewBox 部分在 IE 下会显示
      normalize.css 中也包含这行 */
  overflow: hidden;
}
.login-wrapper {
  width: 100%;
  height: 100%;
  background: url("../../assets/image/login-bg.jpg") center;
  background-size: cover;
  position: relative;
  .login {
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 384px;
    font-size: 14px;
    background: #fff;
    border-radius: 4px;
    .login-header {
      text-align: center;
      border-bottom: 1px solid #e8eaec;
      padding: 14px 16px;
      margin-bottom: 10px;
      .main-title {
        /* margin: 10px 0 0 0; */
        margin: 0;
        font-weight: bold;
        font-size: 20px;
      }
      .desc {
        font-size: 12px;
        color: #999;
        margin: 0 0 1em 0;
      }
    }
    .login-form {
      padding: 0 16px;
      .pwd-show {
        position: absolute;
        display: inline-block;
        width: 20px;
        height: 100%;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
      }
      .submit {
        width: 100%;
      }
    }
  }
  .to {
    color: #67c23a;
    cursor: pointer;
  }
}
</style>
