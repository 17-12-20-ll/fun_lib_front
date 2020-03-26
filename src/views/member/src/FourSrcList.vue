<template>
  <div class="content-warp">
    <div class="top-wrap">
      <div class="top-wrap_head head_input">
        <el-input size="small" v-model="inputName" placeholder="请输入内容" label="组名称" clearable>
          <template slot="prepend">标题：</template>
        </el-input>
        <el-input size="small" v-model="inputCode" placeholder="请输入内容" label="组名称" clearable>
          <template slot="prepend">编码：</template>
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
        :data="fours"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column prop="key" label="序号" width="100">
          <!--        <template slot-scope="scope">{{ scope.row.date }}</template>-->
        </el-table-column>
        <el-table-column prop="name" label="链接名字" width="120"></el-table-column>
        <el-table-column prop="code" label="编码" width="120"></el-table-column>
        <el-table-column prop="url" label="链接" show-overflow-tooltip></el-table-column>
        <el-table-column prop="username" label="账号" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="pwd" label="密码" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="add_time" label="添加时间" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              plain
              @click="handleView(scope.$index, scope.row)"
            >查看
            </el-button>
            <el-button
              size="mini"
              type="success"
              plain
              @click="handleEdit(scope.$index, scope.row)"
            >编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              plain
              @click="handleDelete(scope.$index, scope.row, fours)"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="four_src_count"
        :page-size="page_count"
        @current-change="change">
      </el-pagination>
    </div>

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <div v-if="title === '查看'">
        <ul class="select_list">
          <li class="select_list_item"><span>链接地址:</span>{{four_info.name}}</li>
          <li class="select_list_item"><span>编码:</span>{{four_info.code}}</li>
          <li class="select_list_item"><span>详情:</span>{{four_info.desc}}</li>
          <li class="select_list_item"><span>账号:</span>{{four_info.username}}</li>
          <li class="select_list_item"><span>密码:</span>{{four_info.pwd}}</li>
          <li class="select_list_item"><span>添加时间:</span>{{four_info.add_time}}</li>
        </ul>
      </div>
      <el-form size="small" :model="four_add_info" v-else-if="title === '添加'" ref="four_add_info">
        <el-form-item label="账号链接" label-width="100px" prop="name">
          <el-input v-model="four_add_info.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="编码" label-width="100px" prop="code">
          <el-input v-model="four_add_info.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接" label-width="100px" prop="code">
          <el-input v-model="four_add_info.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" label-width="100px">
          <el-input v-model="four_add_info.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="four_add_info.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="cookie" label-width="100px">
          <el-input v-model="four_add_info.cookie" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="cookie时长" label-width="100px">
          <el-input v-model.number="four_add_info.cookie_time" autocomplete="off" placeholder="过期时长，单位min"></el-input>
        </el-form-item>
        <el-form-item label="账号描述" label-width="100px" prop="desc">
          <el-input type="textarea" v-model="four_add_info.desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="执行脚本" prop="code_script">
          <el-input type="textarea" v-model="four_add_info.code_script" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label-width="100px">
          <el-button type="primary" @click="AddSubmit('four_add_info')">添加</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <el-form size="small" :model="four_info" v-else-if="title === '编辑'" ref="four_info">
        <el-form-item label="账号链接" label-width="100px" prop="name">
          <el-input v-model="four_info.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="编码" label-width="100px" prop="code">
          <el-input v-model="four_info.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接" label-width="100px" prop="code">
          <el-input v-model="four_info.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" label-width="100px">
          <el-input v-model="four_info.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="four_info.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="cookie" label-width="100px">
          <el-input v-model="four_info.cookie" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="cookie时长" label-width="100px">
          <el-input v-model.number="four_info.cookie_time" autocomplete="off" placeholder="过期时长，单位min"></el-input>
        </el-form-item>
        <el-form-item label="账号描述" label-width="100px" prop="desc">
          <el-input type="textarea" v-model="four_info.desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="执行脚本" prop="code_script">
          <el-input type="textarea" v-model="four_info.code_script" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label-width="100px">
          <el-button type="primary" @click="onSubmit('four_info')">修改</el-button>
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
  name: 'FourSrcList',
  data () {
    return {
      inputName: '',
      inputCode: '',
      dialogFormVisible: false,
      title: '',
      four_info: {
        name: '',
        code: '',
        url: '',
        desc: '',
        username: '',
        pwd: '',
        code_script: '',
        cookie_time: '',
        cookie: '',
        add_time: ''
      },
      four_add_info: {
        name: '',
        url: '',
        code: '',
        desc: '',
        username: '',
        pwd: '',
        code_script: '',
        cookie_time: '',
        cookie: '',
      },
      id: '',
      multipleSelection: [],
      page: 1,
      four_src_count: 0,
      page_count: 10
    }
  },
  components: {
    Pagination
  },
  mounted () {
    this.get_data()
  },
  methods: {
    async handleView (index, row) {
      this.title = '查看'
      this.dialogFormVisible = true
      // 发送请求获取详情数据
      await this.$http.getFourSrcInfo(row.id).then(res => {
        this.four_info = res.data
      }).catch(err => {
        console.log(err, 'err')
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleAdd () {
      this.title = '添加'
      this.dialogFormVisible = true
    },
    async handleEdit (index, row) {
      this.id = row.id
      await this.$http.getFourSrcInfo(row.id).then(res => {
        this.four_info = res.data
      }).catch(err => {
        console.log(err, 'err')
      })
      this.title = '编辑'
      this.dialogFormVisible = true
    },
    handleDelete (index, row, rows) {
      console.log('删除')
      let obj = {
        index: index,
        data: rows,
        id: row.id,
        t: 'four_src'
      }
      this.$emit('fun', obj)
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.four_info.id = this.id
          this.$http.postUpdateFourSrc(qs.stringify(this.four_info)).then(res => {
            if (res.code === 200) {
              this.$store.commit('UPDATE_FOUR_SRC', res.data)
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
          this.$http.postAddFourSrc(qs.stringify(this.four_add_info)).then(res => {
            if (res.code === 200) {
              this.get_data()
              this.dialogFormVisible = false
              this.$message({
                message: '添加成功',
                center: true,
                type: 'success',
                customClass: 'hint-message'
              })
            }
          }).catch(err => {
            console.log(err, 'err')
          })
        }
      })
    },
    get_data () {
      this.$http.getFourSrc(this.inputName, this.inputCode, this.page, this.page_count).then(res => {
        if (res.code === 200) {
          if (this.inputName || this.inputCode) {
            this.$message({
              message: '查询成功',
              center: true,
              type: 'success',
              customClass: 'hint-message'
            })
          }
          this.four_src_count = res.count
          this.$store.commit('RECEIVE_FOUR_SRC', res.data)
        }
      }).catch(err => {
        console.log(err, 'err')
      })
    },
    change (p) {
      this.page = p
      this.get_data()
    },
    query () {
      // 查询
      this.page = 1
      this.get_data()
    },
  },
  computed: {
    fours () {
      return this.$store.getters.four_src.map((item, index) => {
        item['key'] = index + 1
        return item
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .top-wrap {
    &_head {
      width: 38%;
    }
  }
</style>
