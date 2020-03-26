<template>
  <div class="content-warp">
    <el-table
      ref="multipleTable"
      :data="admin_log"
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
        label="登录名"
        align="center">
      </el-table-column>
      <el-table-column
        prop="time"
        label="登陆时间"
        width="300"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="ip"
        label="登陆ip"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <Pagination :total="admin_log_count" :type="'admin_log'"/>
  </div>
</template>

<script>
import Pagination from '../../../components/Common/Pagination'

export default {
  name: 'AdminLog',
  data () {
    return {
      multipleSelection: []
    }
  },
  mounted () {
    this.$store.dispatch('action_get_admin_log', 1)
    this.$store.dispatch('action_get_admin_log_count')
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
  },
  components: { Pagination },
  computed: {
    admin_log () {
      return this.$store.getters.admin_log.map((item, index) => {
        item['key'] = index + 1
        return item
      })
    },
    admin_log_count () {
      return this.$store.getters.admin_log_count
    }
  }
}
</script>

<style scoped>

</style>
