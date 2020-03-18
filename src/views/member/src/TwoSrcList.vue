<template>
  <div class="content-warp">
    <div class="top-wrap">
      <div class="top-wrap_head head_input">
        <el-select size="small" v-model="selectOneSrc" placeholder="请选择一级分类" clearable>
          <template slot="prepend">类别</template>
          <el-option :label="o.name" :value="o.id" v-for="o in one_src" :key="o.id"></el-option>
        </el-select>
        <el-input size="small" v-model="inputTwoSrc" placeholder="请输入内容" label="组名称" clearable>
          <template slot="prepend">标题</template>
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
        :data="two_src"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        stripe
      >
        <el-table-column type="selection" width="55px"></el-table-column>
        <el-table-column prop="key" label="序号" width="200"></el-table-column>
        <el-table-column prop="one_name" label="一级资源" width="300"></el-table-column>
        <el-table-column prop="two_name" label="资源名" align="center"></el-table-column>
        <el-table-column prop="pos" label="排序" width="300"></el-table-column>
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
            <el-button
              size="mini"
              type="success"
              plain
              @click="handleAddEntrance(scope.$index, scope.row)"
            >添加入口</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="two_src_count" :type="'two_src'" />
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      width="30%"
      :destroy-on-close="true"
    >
      <div v-if="title === '查看'">
        <el-divider>资源名称:{{two_src_info.name}}</el-divider>
        <el-divider>资源链接:{{two_src_info.title_url}}</el-divider>
        <el-divider>资源描述:{{two_src_info.content}}</el-divider>
        <el-divider>
          排序序号:
          <font color="red">{{two_src_info.pos}}</font>
        </el-divider>
        <el-divider>资源类型:{{two_src_info.src_type}}</el-divider>
        <el-divider>所属一级分类:{{two_src_info.one_src}}</el-divider>
      </div>
      <el-form
        :model="two_src_info"
        v-else-if="title === '编辑'"
        :rules="rules"
        ref="two_src_info"
        class="form-center"
      >
        <el-form-item label="资源名称" label-width="100px" prop="name">
          <el-input v-model="two_src_info.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源链接" label-width="100px" prop="title_url">
          <el-input v-model="two_src_info.title_url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源描述" label-width="100px" prop="content">
          <el-input v-model="two_src_info.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序序号" label-width="100px" prop="pos">
          <el-input v-model="two_src_info.pos" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源类型" label-width="100px" prop="src_type">
          <el-select v-model="two_src_info.src_type" placeholder="请选择资源类型">
            <el-option :label="s.name" :value="s.id" v-for="s in src_types" :key="s.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属一级分类" label-width="100px" prop="one_src">
          <el-select v-model="two_src_info.one_src_id" placeholder="请选择一级分类">
            <el-option :label="o.name" :value="o.id" v-for="o in  one_src" :key="o.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="foot">
          <el-button type="primary" @click="onSubmit('two_src_info')">修改</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <el-form
        :model="two_src_add_info"
        v-else-if="title==='添加资源'"
        :rules="rules"
        ref="two_src_add_info"
      >
        <el-form-item label="资源名" label-width="100px" prop="login_name">
          <el-input v-model="two_src_add_info.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源链接" label-width="100px" prop="pwd">
          <el-input v-model="two_src_add_info.title_url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序位置" label-width="100px">
          <el-input v-model.number="two_src_add_info.pos" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源分类" label-width="100px">
          <el-select v-model="two_src_add_info.src_type" placeholder="请选择资源类型">
            <el-option :label="s.name" :value="s.id" v-for="s in src_types" :key="s.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属分类" label-width="100px">
          <el-select v-model="two_src_add_info.one_src" placeholder="请选择一级分类">
            <el-option :label="o.name" :value="o.id" v-for="o in one_src" :key="o.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源描述" prop="username">
          <el-input type="textarea" v-model="two_src_add_info.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="AddSubmit('two_src_add_info')">添加</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <el-form :model="three_info" v-else ref="three_info">
        <el-form-item label="入口名" label-width="100px" prop="name">
          <el-input v-model="three_info.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="入口链接" label-width="100px" prop="url">
          <el-input v-model="three_info.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序位置" label-width="100px">
          <el-input v-model.number="three_info.pos" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属账号" label-width="100px">
          <el-select v-model="three_info.four_src" placeholder="请选择资源类型">
            <el-option :label="s.name" :value="s.id" v-for="s in all_four_src" :key="s.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入口描述" prop="desc">
          <el-input type="textarea" v-model="three_info.desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="AddEntranceSubmit('three_info')">添加</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
import Pagination from "@/components/Common/Pagination";

export default {
  data() {
    return {
      multipleSelection: [],
      dialogFormVisible: false,
      title: "",
      two_src_add_info: {
        name: "",
        title_url: "",
        content: "",
        pos: 1,
        src_type: null,
        one_src: ""
      },
      two_src_info: {
        name: "",
        title_url: "",
        content: "",
        pos: 0,
        src_type: null,
        one_src: "",
        one_src_id: ""
      },
      three_info: {
        name: "",
        url: "",
        pos: 0,
        four_src: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "输入资源名", trigger: "blur" },
          { min: 2, max: 25, message: "长度在 2 到 25 个字符", trigger: "blur" }
        ],
        pos: [{ required: true, message: "输入位置序号", trigger: "blur" }]
      },
      inputTwoSrc: "",
      selectOneSrc: "",
      id: "",
      src_types: [
        {
          id: 1,
          name: "文件方式(下级文件)"
        },
        {
          id: 2,
          name: "记住密码方式(可下级)"
        },
        {
          id: 3,
          name: "链接方式(终结点级)"
        },
        {
          id: 4,
          name: "代理方式(终结点级)"
        }
      ],
      add_entrance_id: "",
      all_four_src: []
    };
  },
  components: {
    Pagination
  },
  mounted() {
    this.$store.dispatch("action_get_two_src", 1);
    this.$store.dispatch("action_get_two_src_count");
    if (this.one_src.length === 0) {
      this.$store.dispatch("action_get_one_src", 1);
    }
  },
  methods: {
    async handleView(index, row) {
      this.title = "查看";
      this.dialogFormVisible = true;
      // 发送请求获取详情数据
      await this.$http
        .getTwoSrcDetail(row.id)
        .then(res => {
          this.two_src_info = res.data;
        })
        .catch(err => {
          console.log(err, "err");
        });
    },
    async handleEdit(index, row) {
      this.id = row.id;
      await this.$http
        .getTwoSrcDetail(row.id)
        .then(res => {
          this.two_src_info = res.data;
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
    //添加入口资源
    async handleAddEntrance(index, row) {
      this.dialogFormVisible = true;
      this.title = "添加入口";
      this.add_entrance_id = row.id;
      await this.$http
        .getFourSrcAllInfo()
        .then(res => {
          this.all_four_src = res.data;
        })
        .catch(err => {
          console.log(err, "err");
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    AddEntranceSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.three_info.two_src = this.add_entrance_id;
          this.$http
            .postAddThreeSrc(qs.stringify(this.three_info))
            .then(res => {
              if (res.code === 200) {
                this.dialogFormVisible = false;
                this.$message({
                  message: "添加成功",
                  center: true,
                  type: "success",
                  customClass: "hint-message"
                });
              }
            })
            .catch(er => {
              console.log(er, "er");
            });
        } else {
          return false;
        }
      });
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.two_src_info.id = this.id;
          this.$http
            .postUpdateTwoSrc(qs.stringify(this.two_src_info))
            .then(res => {
              if (res.code === 200) {
                // this.$store.dispatch('action_get_two_src', 1, 10)
                this.$store.commit("UPDATE_TWO_SRC", res.data);
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
            .postAddTwoSrc(qs.stringify(this.two_src_add_info))
            .then(res => {
              if (res.code === 200) {
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
    query() {
      // 查询
      this.$http
        .queryTwoSrc(this.inputTwoSrc, this.selectOneSrc)
        .then(res => {
          if (res.code === 200) {
            this.$message({
              message: "查询成功",
              center: true,
              type: "success",
              customClass: "hint-message"
            });
            this.$store.commit("RECEIVE_TWO_SRC", res.data);
          }
        })
        .catch(err => {
          console.log(err, "err");
        });
      this.inputTwoSrc = "";
    },
    handleAdd() {
      this.title = "添加资源";
      this.dialogFormVisible = true;
    }
  },
  computed: {
    two_src: {
      get() {
        return this.$store.getters.two_src.map((item, index) => {
          item["key"] = index + 1;
          return item;
        });
      }
    },
    two_src_count() {
      return this.$store.getters.two_src_count;
    },
    one_src() {
      return this.$store.getters.one_src;
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
