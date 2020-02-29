<template>
  <div class="login">
    <div class="login-wrap">
      <div class="login-wrap-header"></div>
      <div class="login-wrap-main">
        <div class="login-wrap-main-form">
          <el-form class="login_form" label-position="left" label-width="auto" size="mini" :model="user_form"
                   ref="user_form" :rules="rules">
            <el-form-item label="用户名:" class="item" prop="name">
              <el-input v-model="user_form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密  码:" class="item" prop="pwd">
              <el-input v-model="user_form.pwd" type="password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="验证码:" class="item code" prop="code">
              <el-input v-model="user_form.code" autocomplete="off">
              </el-input>
              <img style="width: 60px;height: 28px"
                   :src="img_src" @click="change">
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('user_form')">提交</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="login-wrap-footer"></div>
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
      },
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let param = new URLSearchParams()
          param.append('login_name', this.user_form.name)
          param.append('pwd', this.user_form.pwd)
          param.append('code', this.user_form.code)
          param.append('img_token', this.img_token)
          param.append('back', true)
          this.$http.postLogin(param)
            .then(response => {
              if (response.code === 200) {
                this.$message({
                  message: '登录成功.',
                  customClass: 'hint-message',
                  center: true,
                  iconClass: 'layui-icon layui-icon-ok ico-style'
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
      await this.$http.getImgCode().then(res => {
        this.img_src = 'data:image/png;base64,' + res.data.img
        this.img_token = res.data.token
      }).catch(err => {
        console.log(err, '请求失败')
      })
    }
  },
  mounted () {
    this.change()
  },
}
</script>

<style lang="scss" scoped>
  .login {
    width: 100%;
    height: 800px;
    background-color: rgb(21, 38, 83);
    /*text-align: center;*/
    display: flex;
    justify-content: center;

    &-wrap {
      width: 780px;

      &-header {
        height: 220px;
        background: url("../assets/login_top.gif") no-repeat;
      }

      &-main {
        height: 236px;
        display: flex;
        justify-content: center;
        background: url("../assets/login_center.gif") no-repeat;

        &-form {
          margin-top: 30px;
          height: 200px;
          width: 300px;
        }
      }

      &-footer {
        height: 104px;
        background: url("../assets/login_bottom.gif") no-repeat;
      }
    }
  }

  .form {
    width: 100px;
  }

  .code img {
    margin-left: 5px;
  }
</style>
<style>
  .item .el-form-item__label {
    color: white;
  }

  .code .el-input__inner {
    float: left;
    width: 100px;
  }

  .code .el-input--mini {
    display: inline;
  }
</style>
