<template>
  <div class="appmain-wrap">
    <router-view @fun="deleteItem"></router-view>
  </div>
</template>

<script>
export default {
  name: "appmain",
  methods: {
    deleteItem(obj) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$http.getDaleteItem(obj.t, obj.id).then(resp => {
                if (resp.code === 200) {
                  obj.data.splice(obj.index, 1)
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  })
                }
              })
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除"
              });
            });
      
    }
  }
};
</script>

<style lang="scss" scoped>
.appmain-wrap {
  padding: 35px;
}
</style>