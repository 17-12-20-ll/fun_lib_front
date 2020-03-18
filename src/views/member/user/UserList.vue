<template>
  <div class="content-warp">
    <div class="top-wrap">
      <div class="top-wrap_head head_input">
        <el-input size="small" v-model="inputLoginName" placeholder="请输入内容" label="登录名" clearable>
          <template slot="prepend">登录名：</template>
        </el-input>
        <el-input size="small" v-model="inputUserName" placeholder="请输入内容" label="姓名" clearable>
          <template slot="prepend">姓名：</template>
        </el-input>
        <el-input size="small" v-model="inputGroup" placeholder="请输入内容" label="会员分组" clearable>
          <template slot="prepend">会员分组：</template>
        </el-input>
        <el-input size="small" v-model="inputEmail" placeholder="请输入内容" label="邮箱" clearable>
          <template slot="prepend">邮箱：</template>
        </el-input>
      </div>
      <div class="head_btn">
        <el-button type="primary" size="mini" class="admin-btn" @click="query">查询</el-button>
        <el-button type="success" size="mini" class="admin-btn" @click="handleAdd">添加</el-button>
      </div>
    </div>
    <div class="table_content">
    <el-table
      ref="multipleTable"
      :data="users"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="key"
        label="序号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="login_name"
        label="用户名"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="user_name"
        label="昵称"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="group_name"
        label="分组名"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="total"
        label="点数"
        width="80"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="add_time"
        label="注册时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="end_time"
        label="有效期至"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="last_login_ip"
        label="上次登录ip"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="cur_login_ip"
        label="本次登陆ip"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleView(scope.$index, scope.row)">查看
          </el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="user_count" :type="'user'"/>
    </div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <div v-if="title === '查看'">
        <el-divider>用户分组:{{user_info.group_name}}</el-divider>
        <el-divider>登录名:{{user_info.login_name}}</el-divider>
        <el-divider>密码:{{user_info.pwd}}</el-divider>
        <el-divider>邮箱:{{user_info.email}}</el-divider>
        <el-divider>专业:{{user_info.major}}</el-divider>
        <el-divider>昵称:{{user_info.user_name}}</el-divider>
        <el-divider>qq:{{user_info.qq}}</el-divider>
        <el-divider>电话:{{user_info.phone}}</el-divider>
        <el-divider>结束时间:{{user_info.end_time}}</el-divider>
        <el-divider>可用线程:{{user_info.enable}}</el-divider>
        <el-divider>是否激活:{{user_info.active?'是':'否'}}</el-divider>
      </div>
      <el-form :model="user_info" v-else-if="title === '查看'" ref="user_info">
        <el-form-item label="分组" label-width="100px" prop="name">
          <el-select v-model="user_info.group_id" placeholder="请选择资源类型">
            <el-option :label="g.name" :value="g.id" v-for="g in groups" :key="g.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登录名" label-width="100px">
          <el-input v-model="user_info.login_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="user_info.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="user_info.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="专业方向" label-width="100px">
          <el-input v-model="user_info.major" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="100px">
          <el-input v-model="user_info.user_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="QQ" label-width="100px">
          <el-input v-model="user_info.qq" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="user_info.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="结束时间" label-width="100px">
          <!--          <el-input v-model="user_info.end_time" autocomplete="off"></el-input>-->
          <el-date-picker
            v-model="user_info.end_time"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="可用线程" label-width="100px">
          <el-input-number v-model="user_info.enable" autocomplete="off"></el-input-number>
        </el-form-item>
        <el-form-item label="是否激活" label-width="100px">
          <el-switch
            style="display: block"
            v-model="user_info.active"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否">
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('user_info')">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <el-form :model="user_info" v-else-if="title === '添加'" ref="user_info">
        <el-form-item label="分组" label-width="100px" prop="name">
          <el-select v-model="user_info.group_id" placeholder="请选择资源类型">
            <el-option :label="g.name" :value="g.id" v-for="g in groups" :key="g.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登录名" label-width="100px">
          <el-input v-model="user_info.login_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="user_info.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="user_info.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="专业方向" label-width="100px">
          <el-input v-model="user_info.major" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="100px">
          <el-input v-model="user_info.user_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="QQ" label-width="100px">
          <el-input v-model="user_info.qq" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="user_info.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="结束时间" label-width="100px">
          <el-date-picker
            v-model="user_info.end_time"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="可用线程" label-width="100px">
          <el-input-number v-model="user_info.enable" autocomplete="off"></el-input-number>
        </el-form-item>
        <el-form-item label="是否激活" label-width="100px">
          <el-switch
            style="display: block"
            v-model="user_info.active"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否">
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="AddSubmit('user_info')">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Common/Pagination'
import qs from 'qs'

export default {
  name: 'UserList',
  data () {
    return {
      multipleSelection: [],
      dialogFormVisible: false,
      user_info: {
        group_name: '',
        login_name: '',
        pwd: '',
        email: '',
        major: '',
        user_name: '',
        qq: '',
        phone: '',
        end_time: '',
        enable: '',
        active: '',
        group_id: ''
      },
      title: '',
      inputLoginName: '',
      inputUserName: '',
      inputGroup: '',
      inputEmail: ''
    }
  },
  mounted () {
    this.update()
  },
  components: { Pagination },
  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    async handleView (index, row) {
      this.title = '查看'
      this.dialogFormVisible = true
      // 发送请求获取详情数据
      await this.$http.getUserInfo(row.id).then(res => {
        this.user_info = res.data
      }).catch(err => {
        console.log(err, 'err')
      })
    },
    async handleEdit (index, row) {
      await this.$http.getUserInfo(row.id).then(res => {
        this.user_info = res.data
        this.user_info.active = !!res.data.active
      }).catch(err => {
        console.log(err, 'err')
      })
      this.title = '编辑'
      this.dialogFormVisible = true
    },
    handleAdd () {
      this.title = '添加'
      this.user_info.login_name = ''
      this.user_info.group_id = ''
      this.user_info.pwd = ''
      this.user_info.email = ''
      this.user_info.major = ''
      this.user_info.user_name = ''
      this.user_info.qq = ''
      this.user_info.phone = ''
      this.user_info.end_time = ''
      this.user_info.enable = 1
      this.user_info.active = true
      this.dialogFormVisible = true
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.postUpdateUser(qs.stringify(this.user_info)).then(res => {
            if (res.code === 200) {
              this.$store.commit('UPDATE_USER', res.data)
              this.dialogFormVisible = false
              this.$message({
                message: '更新成功',
                center: true,
                type: 'success',
                customClass: 'hint-message'
              })
            } else {
              this.$message({
                message: res.msg,
                center: true,
                type: 'error',
                customClass: 'hint-message'
              })
            }
          }).catch(err => {
            console.log(err, 'err')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    AddSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.postAddUser(qs.stringify(this.user_info)).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '添加成功',
                center: true,
                type: 'success',
                customClass: 'hint-message'
              })
            } else {
              this.$message({
                message: res.msg,
                center: true,
                type: 'error',
                customClass: 'hint-message'
              })
            }
            this.dialogFormVisible = false
          })
        } else {
          return false
        }
      })
    },
    query () {
      this.$http.getQuery(this.input_login_name, this.input_user_name).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '查询成功',
            center: true,
            type: 'success',
            customClass: 'hint-message'
          })
          this.$store.commit('RECEIVE_ADMINS', res.data)
        }
      }).catch(err => {
        console.log(err, 'err')
      })
      this.input_login_name = ''
      this.input_user_name = ''
    },
    update () {
      this.$store.dispatch('action_get_user', 1)
      this.$store.dispatch('action_get_user_count')
    },
  },
  computed: {
    users () {
      return this.$store.getters.users.map((item, index) => {
        item['key'] = index + 1
        item['total'] = '暂无点数'
        return item
      })
    },
    user_count () {
      return this.$store.getters.user_count
    },
    groups () {
      let tmp = this.$store.getters.groups
      if (tmp.length === 0) {
        this.$store.dispatch('getGroups')
      }
      return this.$store.getters.groups
    }
  }
}
</script>

<style lang="scss" scoped>
.top-wrap {
  &_head {
    width: 72%;
  }
}
</style>
