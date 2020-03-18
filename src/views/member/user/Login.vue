<template>
  <div class="login">
    <div class="login_wrap">
      <!-- <div class="login-wrap-header"></div> -->
      <div class="login_wrap_main">
        <div class="login_wrap_main_head">
          <img src="../../../assets/img/happy_logo1.png" alt/>
          <h3>后台管理系统</h3>
        </div>
        <div class="login_wrap_main_form">
          <el-form
            class="login_form"
            label-position="left"
            label-width="auto"
            status-icon
            :model="user_form"
            ref="user_form"
            :rules="rules"
          >
            <el-form-item label="" class="item" prop="name">
              <el-input prefix-icon="el-icon-user" v-model="user_form.name" autocomplete="off"
                        placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="" class="item" prop="pwd">
              <el-input prefix-icon="el-icon-lock" v-model="user_form.pwd" type="password" autocomplete="off"
                        placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="" class="item code" prop="code">
              <el-input prefix-icon="el-icon-edit-outline" v-model="user_form.code" autocomplete="off"
                        placeholder="请输入验证码"></el-input>
              <img
                class="code_img"
                style="position: absolute; top: 2px; right: 2px; width: 64px; height: 32px;"
                :src="img_src"
                @click="change"
              />
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="submitForm('user_form')">提交</el-button>
              <el-button size="small" @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- <div class="login-wrap-footer"></div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    const check_code = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入图形结果'))
      } else {
        // 判断是否输入的数字
        const is_num = /^\d+$/.test(value)
        if (!is_num) {
          callback(new Error('请输入数字'))
        }
        // 发送请求给后端匹配验证码
        callback()
      }
    }
    return {
      user_form: {
        name: '',
        pwd: '',
        code: ''
      },
      img_src: '',
      img_token: '',
      rules: {
        name: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        pwd: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
        code: [{ required: true, trigger: 'change', validator: check_code }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let param = new URLSearchParams()
          param.append('login_name', this.user_form.name)
          param.append('pwd', this.user_form.pwd)
          param.append('code', this.user_form.code)
          param.append('img_token', this.img_token)
          param.append('back', true)
          this.$http
            .postLogin(param)
            .then(response => {
              if (response.code === 200) {
                this.$message({
                  type: 'success',
                  message: '登录成功',
                  center: true
                })
                // 登陆成功，接收后端传来的token，并保存到本地localStorage
                localStorage.setItem('token', response.data.token)
                // 将token的数据通过信息返回个mutation
                this.$store.dispatch('get_login_info').then(() => {
                  this.$router.push({ path: '/' })
                })
              } else {
                this.$message({
                  message: response.msg,
                  center: true,
                  type: 'error',
                  customClass: 'hint-message'
                })
              }
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm () {
      this.user_form.name = ''
      this.user_form.pwd = ''
      this.user_form.code = ''
    },
    async change () {
      // 切换验证码
      await this.$http
        .getImgCode()
        .then(res => {
          this.img_src = 'data:image/png;base64,' + res.data.img
          this.img_token = res.data.token
        })
        .catch(err => {
          console.log(err, '请求失败')
        })
    }
  },
  mounted () {
    this.change()
  }
}
</script>

<style lang="scss" scoped>
  .login {
    position: fixed;
    top: 0;
    width: 100%;
    height: calc(100vh - 0px);
    background-color: #63b9be;
    display: flex;
    justify-content: center;

    &_wrap {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      width: 425px;
      height: 475px;
      background-color: #fff;
      border-radius: 5px;
      padding: 2% 2.5%;
      box-sizing: border-box;

      &_main {
        &_head {
          margin: 0 auto;
          width: 200px;
          font-size: 24px;
          color: #999;
          text-align: center;

          img {
            border-radius: 5px;
            width: 100%;
            // background-color: #63b9be;
          }

          h3 {
            padding: 10px 0;
          }
        }

        &_form {
          padding: 10% 4% 0;
        }
      }

      // &-header {
      //   height: 220px;
      //   background: url("../assets/login_top.gif") no-repeat;
      // }
      // &-footer {
      //   height: 104px;
      //   background: url("../assets/login_bottom.gif") no-repeat;
      // }
    }
  }

</style>
<style scoped>
  .login >>> .el-input__inner {
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #ccc;
  }

  .login >>> .el-input__icon {
    font-size: 24px;
    color: #63b9be;
  }

  .login >>> .el-input--prefix .el-input__inner {
    padding-left: 40px;
  }

  .login >>> .el-button--primary, .el-button--default {
    margin-top: 15px;
    width: 35%;
    border: 1px solid #63b9be;
    font-size: 16px;
    color: #fff;
    background-color: #63b9be;
  }

  .login >>> .el-button--default {
    float: right;
    background-color: #fff;
    color: #63b9be;
  }
</style>
