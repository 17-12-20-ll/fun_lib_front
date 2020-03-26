<template>
  <div class="content-warp">
    <div class="top-wrap">
      <el-input size="small" v-model="inputGroupName" placeholder="请输入内容" label="组名称" clearable>
        <template slot="prepend">组名称：</template>
      </el-input>
      <div class="head_btn">
        <el-button type="primary" size="mini" class="admin-btn" @click="query">查询</el-button>
        <el-button type="success" size="mini" class="admin-btn" @click="handleAdd">添加</el-button>
      </div>
    </div>
    <div class="table_content">
      <el-table
        ref="multipleTable"
        :data="groups"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="60">
        </el-table-column>
        <el-table-column
          prop="key"
          label="序号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="分组名"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              plain
              size="mini"
              type="primary"
              @click="handleView(scope.$index, scope.row)">查看
            </el-button>
            <el-button
              size="mini"
              @click="viewOneSrc(scope.row)">查看所有资源
            </el-button>
            <el-button
              plain
              size="mini"
              type="success"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              plain
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row, groups)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form size="small" :model="groupInfo" v-if="title === '编辑'" :rules="rules" ref="groupInfo">
        <el-form-item label="组名称" label-width="100px" prop="name">
          <el-input v-model="groupInfo.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" label-width="100px" prop="desc">
          <el-input v-model="groupInfo.desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label-width="100px">
          <el-button type="primary" @click="putSubmit('groupInfo')">修改</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
      <div v-else-if="title === '查看'">
        <ul class="select_list">
          <li class="select_list_item"><span>组名称:</span>{{groupInfo.name}}</li>
          <li class="select_list_item"><span>描述:</span>{{groupInfo.desc}}</li>
        </ul>
      </div>
      <el-form size="small" :model="groupAddInfo" v-else :rules="rules" ref="groupAddInfo">
        <el-form-item label="组名称" label-width="100px" prop="login_name">
          <el-input v-model="groupAddInfo.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" label-width="100px" prop="pwd">
          <el-input v-model="groupAddInfo.desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label-width="100px">
          <el-button type="primary" @click="AddSubmit('groupAddInfo')">添加</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--打开分组所属资源-->
    <el-dialog :title="res_title" :visible.sync="dialogTableVisible">
      <div class="table_data">
        <el-table :data="resData">
          <el-table-column property="key" label="序号" width="100"></el-table-column>
          <el-table-column property="one_src" label="资源列表" width="300"></el-table-column>
          <el-table-column property="name" label="标题" width="300"></el-table-column>
          <el-table-column property="add_time" label="添加时间"></el-table-column>
        </el-table>
        <el-pagination
          layout="prev, pager, next"
          :total="res_data_count"
          :page-size="page_count"
          @current-change="change">
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: 'GroupList',
  data () {
    return {
      page: 1,
      res_data_count: 0,
      page_count: 10,
      row_id: 1,
      multipleSelection: [],
      dialogFormVisible: false,
      dialogTableVisible: false,
      inputGroupName: '',
      resData: [],
      title: '',
      res_title: '',
      groupInfo: {
        name: '',
        desc: ''
      },
      groupAddInfo: {
        name: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入分组名', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        desc: [
          { required: false, message: '请输入描述', trigger: 'blur' },
          { max: 500, message: '最长500个字符', trigger: 'blur' }
        ],
      },
    }
  },
  async mounted () {
    await this.$store.dispatch('getGroups')
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    async handleView (index, row) {
      this.title = '查看'
      this.dialogFormVisible = true
      // 发送请求获取详情数据
      await this.$http.getGroupsInfoApi(row.id).then(res => {
        this.groupInfo = res.data
      }).catch(err => {
        console.log(err, 'err')
      })
    },
    query () {
      this.$store.dispatch('query', this.inputGroupName)
      this.$message({
        message: '查询成功',
        center: true,
        type: 'success',
        customClass: 'hint-message'
      })
      this.inputGroupName = ''
    },
    handleAdd () {
      this.title = '添加分组'
      this.dialogFormVisible = true
    },
    AddSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.postGroupApi(qs.stringify(this.groupAddInfo)).then(res => {
            if (res.code === 200) {
              this.$store.dispatch('getGroups')
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
        Object.keys(this.groupAddInfo).forEach(key => this.groupAddInfo[key] = '')
      })
    },
    async handleEdit (index, row) {
      this.title = '编辑'
      this.dialogFormVisible = true
      // 发送请求获取详情数据
      await this.$http.getGroupsInfoApi(row.id).then(res => {
        this.groupInfo = res.data
      }).catch(err => {
        console.log(err, 'err')
      })
    },
    handleDelete (index, row, rows) {
      console.log('删除')
      let obj = {
        index: index,
        data: rows,
        id: row.id,
        t: 'group'
      }
      this.$emit('fun', obj)
    },
    putSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.putGroupApi(qs.stringify(this.groupInfo)).then(res => {
            if (res.code === 200) {
              this.$store.dispatch('getGroups')
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
    viewOneSrc (row) {
      this.res_title = row.name
      this.row_id = row.id
      this.dialogTableVisible = true
      this.get_data()
    },
    async get_data () {
      await this.$http.getGroupOneSrc(this.row_id, this.page, this.page_count).then(res => {
        if (res.code === 200) {
          this.resData = res.data.map((item, index) => {
            item['key'] = index + 1
            return item
          })
          this.res_data_count = res.count
        } else {
          alert('服务器错误！！')
        }
      }).catch(err => {
        console.log(err, 'err')
      })
    },
    change (p) {
      this.page = p
      this.get_data()
    },
  },
  computed: {
    groups: {
      get () {
        return this.$store.getters.groups.map((item, index) => {
          item['key'] = index + 1
          return item
        })
      }
    }
  }
}
</script>

<style scoped>
  .content {
    margin: 20px 0;
  }

  .el-input {
    width: 300px;
  }

  .top {
    width: 60%;
    margin: 30px 0 20px 0;
    display: flex;
    line-height: 30px;
    justify-content: left;
    padding-left: 10px;
  }

  .btn {
    margin-left: 10px;
  }
</style>
