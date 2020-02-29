<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="one_src"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange" stripe>
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="key"
        label="序号"
        width="120">
        <!--        <template slot-scope="scope">{{ scope.row.date }}</template>-->
      </el-table-column>
      <el-table-column
        prop="name"
        label="资源分类"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="pos"
        label="排序"
        width="200">
      </el-table-column>
      <el-table-column label="操作" width="300">
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
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="30%" :destroy-on-close="true">
      <div v-if="title === '查看'">
        <el-divider>资源名称:{{one_src_info.name}}</el-divider>
        <el-divider>资源描述:{{one_src_info.desc}}</el-divider>
        <el-divider>排序序号:<font color="red">{{one_src_info.pos}}</font></el-divider>
        <div>
          所属分组：
          <el-tag type="success" v-for="g in one_src_info.groups" :key="g.id">{{g.name}}</el-tag>
        </div>
      </div>
      <el-form :model="one_src_info" v-else-if="title === '编辑'" :rules="rules" ref="one_src_info" class="form-center">
        <el-form-item label="分类名称" label-width="100px" prop="login_name">
          <el-input v-model="one_src_info.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详情描述" label-width="100px" prop="pwd">
          <el-input v-model="one_src_info.desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序序号" label-width="100px" prop="pwd">
          <el-input v-model="one_src_info.pos" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox-group v-model="one_src_info.groups">
            <el-checkbox label="复选框 A">aaa</el-checkbox>
            <el-checkbox label="复选框 B"></el-checkbox>
            <el-checkbox label="复选框 C"></el-checkbox>
            <el-checkbox label="禁用" disabled></el-checkbox>
            <el-checkbox label="选中且禁用" disabled></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="foot">
          <el-button type="primary" @click="onSubmit('one_src_info')">修改</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'GroupList',
  data () {
    return {
      multipleSelection: [],
      dialogFormVisible: false,
      title: '',
      one_src_info: {
        desc: '',
        groups: [],
        name: '',
        pos: 0,
        edit_groups: []
      },
      rules: {
        login_name: [
          { required: true, message: '请输入登录名', trigger: 'blur' },
          { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
      },
    }
  },
  mounted () {
    this.$store.dispatch('action_get_one_src')
  },
  methods: {
    async handleView (index, row) {
      this.title = '查看'
      this.dialogFormVisible = true
      // 发送请求获取详情数据
      await this.$http.getOneSrcInfo(row.id).then(res => {
        this.one_src_info = res.data
        this.one_src_info.edit_groups = this.one_src_info.groups.map(obj => {
          return obj.id
        })
      }).catch(err => {
        console.log(err, 'err')
      })
    },
    async handleEdit (index, row) {
      if (!this.one_src_info.name) {
        await this.$http.getOneSrcInfo(row.id).then(res => {
          this.one_src_info = res.data
          this.one_src_info.edit_groups = this.one_src_info.groups.map(obj => {
            return obj.id
          })
        }).catch(err => {
          console.log(err, 'err')
        })
      }
      this.title = '编辑'
      this.dialogFormVisible = true
    },
    handleDelete (index, row) {
      console.log('删除')
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.postUpdateOneSrc(qs.stringify(this.one_src_info)).then(res => {
            if (res.code === 200) {
              this.$store.dispatch('action_get_one_src')
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
    }
  },
  computed: {
    one_src: {
      get () {
        return this.$store.getters.one_src.map((item, index) => {
          item['key'] = index + 1
          return item
        })
      }
    }
  }
}
</script>

<style scoped>
  .el-input {
    width: 200px;
  }
</style>
<style>
  .foot .el-form-item__content {
    text-align: center;
  }
</style>
