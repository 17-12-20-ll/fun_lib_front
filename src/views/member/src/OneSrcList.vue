<template>
  <div class="content-wrap">
    <div class="top-wrap">
      <el-input size="small" v-model="inputOneSrc" placeholder="请输入内容" label="组名称" clearable>
        <template slot="prepend">分类名称：</template>
      </el-input>
      <div class="head_btn">
        <el-button type="primary" size="mini" class="admin-btn" @click="query">查询</el-button>
        <el-button type="success" size="mini" class="admin-btn" @click="handleAdd">添加</el-button>
      </div>
    </div>
    <div class="table_content">
      <el-table
        ref="multipleTable"
        :data="one_src"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        stripe
      >
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column prop="key" label="序号" width="100">
          <!--        <template slot-scope="scope">{{ scope.row.date }}</template>-->
        </el-table-column>
        <el-table-column prop="name" label="资源分类" align="center"></el-table-column>
        <el-table-column prop="pos" label="排序"></el-table-column>
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
              @click="handleDelete(scope.$index, scope.row, one_src)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="one_src_count"
        :page-size="page_count"
        @current-change="change">
      </el-pagination>
    </div>
    <!-- 模态 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      :destroy-on-close="true"
    >
      <div v-if="title === '查看'">
        <ul class="select_list">
          <li class="select_list_item"><span>资源名称：</span>{{one_src_info.name}}</li>
          <li class="select_list_item"><span>资源描述：</span>{{one_src_info.desc}}</li>
          <li class="select_list_item"><span>
            排序序号：</span>
            <font color="red">{{one_src_info.pos}}</font>
          </li>
          <li class="select_list_item item_tag"><span>
            所属分组：</span>
            <div class="tag">
              <el-tag size="mini" type="primary" v-for="g in one_src_info.groups" :key="g.id">{{g.name}}</el-tag>
            </div>
          </li>
        </ul>
      </div>
      <el-form
        size="small"
        :model="one_src_info"
        v-else-if="title === '编辑'"
        :rules="rules"
        ref="one_src_info"
        class="form-center"
      >
        <el-form-item label="分类名称" label-width="100px" prop="name">
          <el-input v-model="one_src_info.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详情描述" label-width="100px" prop="desc">
          <el-input v-model="one_src_info.desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序序号" label-width="100px" prop="pos">
          <el-input v-model="one_src_info.pos" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label-width="100px">
          <el-checkbox-group v-model="edit_groups">
            <el-checkbox :label="g.id" v-for="g in user_groups" :key="g.id">{{g.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label-width="100px" class="foot">
          <el-button type="primary" @click="onSubmit('one_src_info')">修改</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs'
import Pagination from '@/components/Common/Pagination'

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
        pos: 0
      },
      edit_groups: [],
      rules: {
        name: [
          { required: true, message: '输入资源名', trigger: 'blur' },
          { min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur' }
        ],
        pos: [{ required: true, message: '输入位置序号', trigger: 'blur' }]
      },
      id: '', // 当前编辑id
      inputOneSrc: '',
      page: 1,
      one_src_count: 0,
      page_count: 10
    }
  },
  components: { Pagination },
  mounted () {
    this.get_data()
  },
  methods: {
    async handleView (index, row) {
      this.title = '查看'
      this.dialogFormVisible = true
      // 发送请求获取详情数据
      await this.$http
        .getOneSrcInfo(row.id)
        .then(res => {
          this.one_src_info = res.data
          this.edit_groups = res.data.groups.map(obj => {
            return obj.id
          })
        })
        .catch(err => {
          console.log(err, 'err')
        })
    },
    async handleEdit (index, row) {
      await this.$http
        .getOneSrcInfo(row.id)
        .then(res => {
          this.one_src_info = res.data
          this.edit_groups = res.data.groups.map(obj => {
            return obj.id
          })
        })
        .catch(err => {
          console.log(err, 'err')
        })
      this.title = '编辑'
      this.dialogFormVisible = true
      this.id = row.id
    },
    handleDelete(index, row, rows) {
      console.log("删除");
      let obj = {
        index: index,
        data: rows,
        id: row.id,
        t: 'one_src'
      }
      this.$emit('fun', obj)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.one_src_info.groups = JSON.stringify(this.edit_groups)
          this.one_src_info.id = this.id
          this.$http
            .postUpdateOneSrc(qs.stringify(this.one_src_info))
            .then(res => {
              if (res.code === 200) {
                this.$store.dispatch('action_get_one_src', 1)
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
            })
            .catch(err => {
              console.log(err, 'err')
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    change (p) {
      this.page = p
      this.get_data()
    },

    get_data () {
      this.$http
        .getOneSrc(this.inputOneSrc, this.page, this.page_count)
        .then(res => {
          if (res.code === 200) {
            if (this.inputOneSrc) {
              this.$message({
                message: '查询成功',
                center: true,
                type: 'success',
                customClass: 'hint-message'
              })
            }
            this.one_src_count = res.count
            this.$store.commit('RECEIVE_ONE_SRC', res.data)
          }
        })
        .catch(err => {
          console.log(err, 'err')
        })
    },
    query () {
      // 查询
      this.page = 1
      this.get_data()
    },
    handleAdd () {
      // 添加
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
    },
    user_groups: {
      get () {
        if (!this.$store.getters.groups.length) {
          this.$store.dispatch('getGroups')
        }
        return this.$store.getters.groups
      }
    },
  }
}
</script>
<style scoped>
.item_tag {
  display: flex;
  justify-content: space-between;
}
.tag {
  width: 79%;
}
.content-wrap >>> .el-tag--mini {
  margin: 5px 10px 5px 0;
}
</style>
