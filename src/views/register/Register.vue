<template>
  <div class="register-wrapper">
    <div class="register">
      <div class="register-header">
        <h3 class="main-title">用户注册</h3>
      </div>
      <el-form
        :model="userRegister"
        ref="userRegister"
        :rules="rules"
        class="register-form"
      >
        <el-form-item prop='name'>
          <el-input
            type="text"
            v-model="userRegister.name"
            placeholder="请输入用户名"
          >
            <template slot="prepend">
              <i class="el-icon-user-solid"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="至少六位密码,区分大小写"
            v-model="userRegister.password"
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
        <el-form-item prop="checkpwd">
          <el-input
            type="password"
            placeholder="请确认密码"
            v-model="userRegister.checkpwd"
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
        <el-form-item prop='tel'>
          <el-input
            type="text"
            v-model.number="userRegister.tel"
            placeholder="请输入手机号码"
          >
            <template slot="prepend">
              <i class="el-icon-mobile-phone"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="submit"
            type="primary"
            @click="handleSubmit('userRegister')"
          >{{ btnText}}</el-button>
        </el-form-item>
      </el-form>
      <hr>
      <p>已有账号，马上去<span
          class="to"
          @click="toLogin"
        >登录</span></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('至少6位,区分大小写'));
      } else {
        if (this.userRegister.checkpwd !== '') {
          this.$refs.userRegister.validateField('checkPwd');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.userRegister.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    const checkPhone = (rule, value, callback) => {
      if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('请输入正确的手机号码!'));
      } else {
        callback();
      }/* else {
        this.$api.bsp.member
          .checkPhoneNo(this.userRegister.userPhone, this.userRegister.memId).then((ret) => {
          if (ret) {
            callback(new Error('该手机号码已存在，请修改手机号码。'));
          } else {
            callback();
          }
        });
      } */
    };
    return {
      btnText: '注册',
      userRegister: {
        name: '',
      },
      rules: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [
          {
            required: true, min: 6, message: '至少6位,区分大小写', trigger: 'blur',
          },
          { validator: validatePass, trigger: 'blur' }],
        checkpwd: [{ validator: validatePass2, trigger: 'blur' }],
        tel: [
          { validator: checkPhone, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          /* this.$http.post('/api/user/addUser', {
            username: this[formName].name,
            password: this[formName].password,
            tel: this[formName].tel,
          }, {}).then((respnse) => {
            console.log(respnse);
          }); */
          axios.post('/api/user/addUser', {
            username: this[formName].name,
            password: this[formName].password,
            tel: this[formName].tel,
          }).then((response) => {
            // console.log(response);
            if (response.status === 200) {
              this.$router.push({
                name: 'home',
              });
            }
          });
        } else {
          return false;
        }
        return true;
      });
    },
    toLogin() {
      this.$router.push({
        name: 'login',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.register-wrapper {
  width: 100%;
  height: 100%;
  background: url("../../assets/image/login-bg.jpg") center;
  background-size: cover;
  position: relative;
  .register {
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 384px;
    font-size: 14px;
    background: #fff;
    border-radius: 4px;
    .register-header {
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
    }
    .register-form {
      padding: 0 16px;
      .submit {
        width: 100%;
      }
    }
  }
  .to {
    color: #f86600;
    cursor: pointer;
  }
}
</style>
