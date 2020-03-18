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
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="key" label="序号" width="120">
          <!--        <template slot-scope="scope">{{ scope.row.date }}</template>-->
        </el-table-column>
        <el-table-column prop="name" label="链接名字" width="120"></el-table-column>
        <el-table-column prop="code" label="编码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="username" label="账号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="pwd" label="密码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="add_time" label="添加时间" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              plain
              @click="handleView(scope.$index, scope.row)"
            >查看</el-button>
            <el-button
              size="mini"
              type="success"
              plain
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              plain
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="four_src_count" :type="'four_src'" />
    </div>

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <div v-if="title === '查看'">
        <el-divider>链接地址:{{four_info.name}}</el-divider>
        <el-divider>编码:{{four_info.code}}</el-divider>
        <el-divider>详情:{{four_info.desc}}</el-divider>
        <el-divider>账号:{{four_info.username}}</el-divider>
        <el-divider>密码:{{four_info.pwd}}</el-divider>
        <el-divider>添加时间:{{four_info.add_time}}</el-divider>
      </div>
      <el-form :model="four_add_info" v-else-if="title === '添加'" ref="four_add_info">
        <el-form-item label="账号链接" label-width="100px" prop="name">
          <el-input v-model="four_add_info.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="编码" label-width="100px" prop="code">
          <el-input v-model="four_add_info.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" label-width="100px">
          <el-input v-model.number="four_add_info.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model.number="four_add_info.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号描述" prop="desc">
          <el-input type="textarea" v-model="four_add_info.desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="AddSubmit('four_add_info')">添加</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <el-form :model="four_info" v-else-if="title === '编辑'" ref="four_info">
        <el-form-item label="账号链接" label-width="100px" prop="name">
          <el-input v-model="four_info.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="编码" label-width="100px" prop="code">
          <el-input v-model="four_info.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" label-width="100px">
          <el-input v-model.number="four_info.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model.number="four_info.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号描述" prop="desc">
          <el-input type="textarea" v-model="four_info.desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('four_info')">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Common/Pagination";
import qs from "qs";

export default {
  name: "FourSrcList",
  data() {
    return {
      inputName: "",
      inputCode: "",
      dialogFormVisible: false,
      title: "",
      four_info: {
        name: "",
        code: "",
        desc: "",
        username: "",
        pwd: "",
        add_time: ""
      },
      four_add_info: {
        name: "",
        code: "",
        desc: "",
        username: "",
        pwd: ""
      },
      id: "",
      multipleSelection: []
    };
  },
  components: {
    Pagination
  },
  mounted() {
    this.update();
  },
  methods: {
    async handleView(index, row) {
      this.title = "查看";
      this.dialogFormVisible = true;
      // 发送请求获取详情数据
      await this.$http
        .getFourSrcInfo(row.id)
        .then(res => {
          this.four_info = res.data;
        })
        .catch(err => {
          console.log(err, "err");
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleAdd() {
      this.title = "添加";
      this.dialogFormVisible = true;
    },
    async handleEdit(index, row) {
      this.id = row.id;
      await this.$http
        .getFourSrcInfo(row.id)
        .then(res => {
          this.four_info = res.data;
        })
        .catch(err => {
          console.log(err, "err");
        });
      this.title = "编辑";
      this.dialogFormVisible = true;
    },
    handleDelete(index, row) {
      console.log("删除");
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.four_info.id = this.id;
          this.$http
            .postUpdateFourSrc(qs.stringify(this.four_info))
            .then(res => {
              if (res.code === 200) {
                this.$store.commit("UPDATE_FOUR_SRC", res.data);
                this.dialogFormVisible = false;
                this.$message({
                  message: "更新成功",
                  center: true,
                  type: "success",
                  customClass: "hint-message"
                });
              } else {
                this.$message({
                  message: res.msg,
                  center: true,
                  type: "error",
                  customClass: "hint-message"
                });
              }
            })
            .catch(err => {
              console.log(err, "err");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    AddSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .postAddFourSrc(qs.stringify(this.four_add_info))
            .then(res => {
              if (res.code === 200) {
                this.update();
                this.dialogFormVisible = false;
                this.$message({
                  message: "添加成功",
                  center: true,
                  type: "success",
                  customClass: "hint-message"
                });
              }
            })
            .catch(err => {
              console.log(err, "err");
            });
        }
      });
    },
    update() {
      this.$store.dispatch("action_get_four_src", 1);
      this.$store.dispatch("action_get_four_src_count");
    },
    query() {
      // 查询
      this.$http
        .queryFourSrc(this.inputName, this.inputCode)
        .then(res => {
          if (res.code === 200) {
            this.$message({
              message: "查询成功",
              center: true,
              type: "success",
              customClass: "hint-message"
            });
            this.$store.commit("RECEIVE_FOUR_SRC", res.data);
          }
        })
        .catch(err => {
          console.log(err, "err");
        });
      this.inputName = "";
      this.inputCode = "";
    }
  },
  computed: {
    fours() {
      return this.$store.getters.four_src.map((item, index) => {
        item["key"] = index + 1;
        return item;
      });
    },
    four_src_count() {
      return this.$store.getters.four_src_count;
    }
  }
};
</script>

<style lang="scss" scoped>
.top-wrap {
  &_head {
    width: 35%;
  }
}
</style>
