<template>
  <div class="content-warp">
    <el-table
      ref="multipleTable"
      :data="threes"
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
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="入口名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="two_src_name"
        label="资源名称"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="four_src_name"
        label="所属账号地址"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="pos"
        label="位置"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="url"
        label="链接"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="add_time"
        label="添加时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini" type="primary" plain
            @click="handleView(scope.$index, scope.row)">查看
          </el-button>
          <el-button
            size="mini" type="success" plain
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini" type="danger" plain
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="three_src_count" :type="'three_src'"/>
    <!-- 模态 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <div v-if="title === '查看'">
        <el-divider>资源名:{{three_info.name}}</el-divider>
        <el-divider>所属资源:{{three_info.two_src}}</el-divider>
        <el-divider>url:{{three_info.url}}</el-divider>
        <el-divider>所属账号:{{three_info.four_src}}</el-divider>
        <el-divider>username:{{three_info.username}}</el-divider>
        <el-divider>pwd:{{three_info.pwd}}</el-divider>
        <el-divider>desc:{{three_info.desc}}</el-divider>
        <el-divider>pos:{{three_info.pos}}</el-divider>
        <el-divider>add_time:{{three_info.add_time}}</el-divider>
      </div>
      <el-form :model="three_edit_info" v-else-if="title==='编辑'" ref="three_info">
        <el-form-item label="入口名" label-width="100px" prop="name">
          <el-input v-model="three_edit_info.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="入口链接" label-width="100px" prop="url">
          <el-input v-model="three_edit_info.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序位置" label-width="100px">
          <el-input-number v-model="three_edit_info.pos" autocomplete="off"></el-input-number>
        </el-form-item>
        <el-form-item label="所属二级资源" label-width="100px">
          <el-input v-model="three_edit_info.two_src" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="所属账号" label-width="100px">
          <el-select v-model="three_edit_info.four_src" placeholder="请选择资源类型">
            <el-option :label="s.name" :value="s.id" v-for="s in all_four_src" :key="s.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入口描述" prop="desc">
          <el-input type="textarea" v-model="three_edit_info.desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="EditSubmit('three_info')">添加</el-button>
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
  name: 'ThreeSrcList',
  data () {
    return {
      multipleSelection: [],
      title: '',
      dialogFormVisible: false,
      three_info: {
        name: '',
        desc: '',
        url: '',
        two_src: '',
        four_src: '',
        username: '',
        pwd: '',
        pos: '',
        add_time: '',
      },
      three_edit_info: {},
      id: '',
      all_four_src: ''
    }
  },
  mounted () {
    this.update()
  },
  components: {
    Pagination
  },
  methods: {
    async handleView (index, row) {
      this.title = '查看'
      this.dialogFormVisible = true
      // 发送请求获取详情数据
      await this.$http.getThreeSrcInfo(row.id).then(res => {
        this.three_info = res.data
      }).catch(err => {
        console.log(err, 'err')
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    async handleEdit (index, row) {
      this.id = row.id
      await this.$http.getThreeSrcInfo(row.id).then(res => {
        this.three_edit_info = res.data
      }).catch(err => {
        console.log(err, 'err')
      })
      await this.$http.getFourSrcAllInfo().then(res => {
        this.all_four_src = res.data
      }).catch(err => {
        console.log(err, 'err')
      })
      this.title = '编辑'
      this.dialogFormVisible = true
    },
    handleDelete (index, row) {
      console.log('删除')
    },
    EditSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.three_edit_info.id = this.id
          this.$http.postUpdateThreeSrc(qs.stringify(this.four_info)).then(res => {
            if (res.code === 200) {
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
    update () {
      this.$store.dispatch('action_get_three_src', 1)
      this.$store.dispatch('action_get_three_src_count')
    },
    query () {
      // 查询
      this.$http.queryFourSrc(this.inputName, this.inputCode).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '查询成功',
            center: true,
            type: 'success',
            customClass: 'hint-message'
          })
          this.$store.commit('RECEIVE_FOUR_SRC', res.data)
        }
      }).catch(err => {
        console.log(err, 'err')
      })
      this.inputName = ''
      this.inputCode = ''
    },
  },
  computed: {
    threes () {
      return this.$store.getters.three_src.map((item, index) => {
        item['key'] = index + 1
        return item
      })
    },
    three_src_count () {
      return this.$store.getters.three_src_count
    }
  }
}
</script>

<style scoped>

</style>
