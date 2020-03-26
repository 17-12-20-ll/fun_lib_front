<template>
  <div class="content-warp">
    <div class="top-wrap">
        <el-input size="small" v-model="inputName" placeholder="请输入内容" label="名称" clearable>
          <template slot="prepend">名称：</template>
        </el-input>
      <div class="head_btn">
        <el-button type="primary" size="mini" class="admin-btn" @click="query">查询</el-button>
        <el-button type="success" size="mini" class="admin-btn" @click="handleAdd">添加</el-button>
      </div>
    </div>
    <div class="table_content">
      <el-table
      ref="multipleTable"
      :data="trade_types"
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
        label="名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格"
        width="200"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="days"
        label="天数"
        width="200"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            plain
            @click="handleDelete(scope.$index, scope.row, trade_types)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" :destroy-on-close="true">
      <el-form size="small" :model="trade_type_info" ref="trade_type_info" class="form-center">
        <el-form-item label="权限分组" label-width="100px">
          <el-select v-model="trade_type_info.group" placeholder="请选择资源类型">
            <el-option :label="g.name" :value="g.id" v-for="g in groups" :key="g.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额" label-width="100px">
          <el-input-number v-model="trade_type_info.price" autocomplete="off"></el-input-number>
        </el-form-item>
        <el-form-item label="名称" label-width="100px">
          <el-input v-model="trade_type_info.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="天数" label-width="100px">
          <el-input-number v-model="trade_type_info.days" autocomplete="off"></el-input-number>
        </el-form-item>
        <el-form-item label-width="100px">
          <el-button type="primary" v-if="title === '编辑'" @click="onSubmit('trade_type_info')">
            修改
          </el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: 'TradeTypeList',
  data () {
    return {
      inputName: '',
      multipleSelection: [],
      dialogFormVisible: false,
      trade_type_info: {
        group: '',
        price: '',
        name: '',
        days: '',
      },
      title: ''
    }
  },
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
    async handleEdit (index, row) {
      await this.$http.getTradeType(row.id).then(res => {
        this.trade_type_info = res.data
      }).catch(err => {
        console.log(err, 'err')
      })
      this.title = '编辑'
      this.dialogFormVisible = true
    },
    handleAdd () {
      this.title = '添加'
      this.trade_type_info.group = ''
      this.trade_type_info.price = ''
      this.trade_type_info.name = ''
      this.trade_type_info.days = ''
      this.dialogFormVisible = true
    },
    handleDelete (index, row, rows) {
      console.log('删除')
      let obj = {
        index: index,
        data: rows,
        id: row.id,
        t: 'trade_type'
      }
      this.$emit('fun', obj)
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.postUpdateTradeType(qs.stringify(this.trade_type_info)).then(res => {
            if (res.code === 200) {
              this.$store.dispatch('action_get_trade_types')
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
          this.$http.postAddTradeType(qs.stringify(this.trade_type_info)).then(res => {
            this.$message({
              message: '添加成功',
              center: true,
              type: 'success',
              customClass: 'hint-message'
            })
            this.dialogFormVisible = false
            this.$store.dispatch('action_get_trade_types')
          })
        } else {
          return false
        }
      })
    },
    query () {
      this.$http.queryTradeType(this.inputName).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '查询成功',
            center: true,
            type: 'success',
            customClass: 'hint-message'
          })
          this.$store.commit('RECEIVE_TRADE_TYPES', res.data)
        }
      }).catch(err => {
        console.log(err, 'err')
      })
    }
  },
  mounted () {
    this.$store.dispatch('action_get_trade_types')
  },
  computed: {
    trade_types () {
      return this.$store.getters.trade_types.map((item, index) => {
        item['key'] = index + 1
        return item
      })
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
