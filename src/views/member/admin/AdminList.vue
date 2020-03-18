<template>
  <div class="admin_warp">
    <div class="admin_warp_top">
      <div class="admin_warp_top_input head_input">
        <el-input size="small" v-model="input_login_name" placeholder="请输入内容" label="登录名" clearable>
          <template slot="prepend">登录名：</template>
        </el-input>
        <el-input size="small" v-model="input_user_name" placeholder="请输入内容" label="用户名" clearable>
          <template slot="prepend">用户名：</template>
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
        :data="admins"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="key" label="序号" width="160">
          <!--        <template slot-scope="scope">{{ scope.row.date }}</template>-->
        </el-table-column>
        <el-table-column prop="login_name" label="登录名" width="200"></el-table-column>
        <el-table-column prop="username" label="姓名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="role_name" label="角色" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" plain @click="handleView(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini" type="success" plain @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" plain @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="admin_warp_allbtn">
      <el-button size="small" @click="toggleSelection()">批量删除</el-button>
    </div>
    <!-- 模态 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="admin_info" v-if="title === '编辑'" :rules="rules" ref="admin_info">
        <el-form-item label="登录名" label-width="100px" prop="login_name">
          <el-input v-model="admin_info.login_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px" prop="pwd">
          <el-input v-model="admin_info.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" label-width="100px" prop="username">
          <el-input v-model="admin_info.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色名" label-width="100px">
          <el-input v-model="admin_info.role_name" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item class="foot" label-width="100px">
          <el-button size="small" type="primary" @click="onSubmit('admin_info')">修改</el-button>
          <el-button size="small">取消</el-button>
        </el-form-item>
      </el-form>
      <div v-else-if="title === '查看'">
        <ul class="select_list">
          <li class="select_list_item"><span>登录名:</span>{{admin_info.login_name}}</li>
          <li class="select_list_item"><span>密 码:</span>{{admin_info.pwd}}</li>
          <li class="select_list_item"><span>姓 名:</span>{{admin_info.username}}</li>
          <li class="select_list_item"><span>角色名:</span>{{admin_info.role_name}}</li>
        </ul>
      </div>
      <el-form :model="admin_add_info" v-else :rules="rules" ref="admin_add_info">
        <el-form-item label="登录名" label-width="100px" prop="login_name">
          <el-input v-model="admin_add_info.login_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px" prop="pwd">
          <el-input v-model="admin_add_info.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" label-width="100px" prop="username">
          <el-input v-model="admin_add_info.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色名" label-width="100px">
          <el-input v-model="admin_add_info.role_name" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label-width="100px">
          <el-button size="small" type="primary" @click="AddSubmit('admin_add_info')">添加</el-button>
          <el-button size="small">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";

export default {
  data() {
    return {
      multipleSelection: [],
      dialogFormVisible: false,
      admin_form: {
        name: "admin"
      },
      title: "",
      admin_info: {
        login_name: "",
        pwd: "",
        username: "",
        role_name: ""
      },
      admin_add_info: {
        login_name: "",
        pwd: "",
        username: "",
        role_name: "管理员"
      },
      rules: {
        login_name: [
          { required: true, message: "请输入登录名", trigger: "blur" },
          { min: 5, max: 18, message: "长度在 5 到 18 个字符", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ]
      },
      input_login_name: "",
      input_user_name: ""
    };
  },
  mounted() {
    // 获取管理员列表
    this.$store.dispatch("action_get_admins");
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async handleView(index, row) {
      this.title = "查看";
      this.dialogFormVisible = true;
      // 发送请求获取详情数据
      await this.$http
        .getAdminInfo(row.id)
        .then(res => {
          this.admin_info = res.data;
        })
        .catch(err => {
          console.log(err, "err");
        });
    },
    async handleEdit(index, row) {
      if (!this.admin_info.login_name) {
        await this.$http
          .getAdminInfo(row.id)
          .then(res => {
            this.admin_info = res.data;
          })
          .catch(err => {
            console.log(err, "err");
          });
      }
      this.title = "编辑";
      this.dialogFormVisible = true;
    },
    handleAdd() {
      this.title = "添加管理员";
      this.dialogFormVisible = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .postUpdateAdmin(qs.stringify(this.admin_info))
            .then(res => {
              if (res.code === 200) {
                this.$store.dispatch("action_get_admins");
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
            .postAddAdmin(qs.stringify(this.admin_add_info))
            .then(res => {
              this.$message({
                message: "添加成功",
                center: true,
                type: "success",
                customClass: "hint-message"
              });
              this.dialogFormVisible = false;
              this.$store.commit("ADD_ADMIN", this.admin_add_info);
            });
        } else {
          return false;
        }
      });
    },
    query() {
      this.$http
        .getQuery(this.input_login_name, this.input_user_name)
        .then(res => {
          if (res.code === 200) {
            this.$message({
              message: "查询成功",
              center: true,
              type: "success",
              customClass: "hint-message"
            });
            this.$store.commit("RECEIVE_ADMINS", res.data);
          }
        })
        .catch(err => {
          console.log(err, "err");
        });
      this.input_login_name = "";
      this.input_user_name = "";
    }
  },
  computed: {
    admins: {
      get() {
        return this.$store.getters.admins.map((item, index) => {
          item["key"] = index + 1;
          return item;
        });
      },
      set(val) {
        // 修改state中的值
        this.$store.commit("RECEIVE_ADMINS", val);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$backColor:rgb(242, 242, 242);
$mainColor: #63b9be;
.admin_warp {
  &_top {
    display: flex;
    &_input {
      width: 35%;
    }
    // &_btn {
    //   @include flex;
    //   width: 8%;
    //   margin-left: 35px;
    //   font-size: 13px;
    // }
  }
  &_allbtn {
    margin: 20px 0;
  }
}
.select_list {
  padding: 0 20px;
  &_item {
    width: 50%;
    padding: 10px 0;
    border-bottom:1px solid $backColor;
    span {
      width: 15%;
      display: inline-block;
    }
    &:hover {
      background-color: $backColor;
    }
  }
}
</style>
