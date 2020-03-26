<template>
  <div class="content-warp">
    <el-table
      ref="multipleTable"
      :data="trade_cards"
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
        prop="trade_type"
        label="充值类型"
        align="center">
      </el-table-column>
      <el-table-column
        prop="group"
        label="分组权限"
        width="300"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="card_id"
        label="卡号"
        width="300"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="card_pwd"
        label="卡密"
        width="180"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="是否可用"
        width="120"
        show-overflow-tooltip>
        <template slot-scope="scope"> {{scope.row.is_use?'否':'是'}}</template>
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
            @click="handleDelete(scope.$index, scope.row, trade_cards)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="trade_card_count" :type="'trade_card'"/>
  </div>
</template>

<script>
import qs from 'qs'
import Pagination from '../../../components/Common/Pagination'

export default {
  name: 'CardTradeList',
  data () {
    return {}
  },
  components: {
    Pagination
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
        t: 'card'
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
    this.$store.dispatch('action_get_trade_cards', 1)
    this.$store.dispatch('action_get_trade_card_count')
  },
  computed: {
    trade_cards () {
      return this.$store.getters.trade_cards.map((item, index) => {
        item['key'] = index + 1
        return item
      })
    },
    trade_card_count () {
      return this.$store.getters.trade_card_count
    }
  }
}
</script>

<style scoped>

</style>
