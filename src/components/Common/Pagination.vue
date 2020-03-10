<template>
  <el-pagination
    layout="prev, pager, next"
    :total="total"
    @current-change="change"
    :hide-on-single-page="true">
  </el-pagination>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['total', 'type'],
  methods: {
    change (p) {
      // 页面改变, 根据传入的type值进行页码数据的改变
      if (this.type === 'two_src') {
        this.$store.dispatch('action_get_two_src', p)
      } else if (this.type === 'four_src') {
        this.$store.dispatch('action_get_four_src', p)
      } else if (this.type === 'one_src') {
        this.$store.dispatch('action_get_one_src', p)
      } else if (this.type === 'three_src') {
        this.$store.dispatch('action_get_three_src', p)
      } else if (this.type === 'user') {
        this.$store.dispatch('action_get_user', p)
      }
    },
  }
}
</script>

<style scoped>

</style>
