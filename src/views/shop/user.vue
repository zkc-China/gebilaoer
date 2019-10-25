<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.username"
        placeholder="请输入查找的用户名"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >查找</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-circle-plus"
        @click="handleCreate"
      >新建</el-button>
      <!-- <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="danger"
        icon="el-icon-remove"
        @click="handleDelete"
      >删除</el-button> -->
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="userlist"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column label="姓名" align="center" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.mole == 'true' ? '女':'男' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="出生日期" align="center" width="160px">
        <template slot-scope="scope">
          <span>{{ scope.row.birthday | parseTime('{y}-{m}-{d} ') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="520" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">修改</el-button>
          <el-button type="primary" size="mini" style="width:70px"  @click="handleCheck(row)">查看信息</el-button>
          <el-button type="success" size="mini" style="width:80px" @click="handleDelete(row)">屈光检查</el-button>
          <el-button type="success" size="mini" style="width:80px" @click="handleDelete(row)">视功能检查</el-button>
          <el-button type="success" size="mini" style="width:80px" @click="handleDelete(row)">训练记录</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="user"
        label-position="left"
        label-width="120px"
        style="width: auto; max-width:600px; margin-left:50px; margin-bottom:-50px;"
      >
        <el-form-item label="姓名:" prop="username">
          <el-input v-model="user.username" />
        </el-form-item>
        <el-form-item v-if="dialogStatus==='create'" label="密码：" show-password prop="pwd">
          <el-input v-model="user.pwd" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="user.phone" />
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="user.email" />
        </el-form-item>
        <el-form-item label="出生日期:" prop="birthday">
          <el-date-picker
            v-model="user.birthday"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          />
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio-group v-model="user.mole">
            <el-radio :label="true">女</el-radio>
            <el-radio :label="false">男</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="家庭地址:">
          <el-input v-model="user.address" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  postmanagerlist, // 获取用户列表
  postmanagerAdd, // 添加用户
  postmanagerDelete, // 删除用户
  postmanagerChange // 修改用户信息
} from "@/api/person";
import request from "@/utils/request";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

export default {
  name: "Usermanage",
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      user: {
        name: "", // 姓名
        username: "", // 用户名
        pwd: "", // 密码
        birthday: "", // 出生日期
        phone: "", // 手机号码
        mole: true, // 性别
        address: "", // 家庭住址
        email: "", // 邮箱
        id: "", // 用户id
        weiId: "",
        createdAt: "",
        roles: "admin"
      },
      userlist: [], // 用户列表
      textMap: {
        update: "编辑",
        create: "新建"
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      dialogVisible: false, // 弹出框状态值
      listQuery: {
        // 分页查询
        pageNo: 1,
        pageSize: 20,
        username: ""
      },
      dialogStatus: "", // 创建还是修改
      tableKey: 0,
      listLoading: true, // loading状态
      total: 0,
      dialogFormVisible: false,
      rules: {
        username: [
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 16 个字符",
            trigger: "blur"
          },
          {
            pattern: /^[\w\u4E00-\u9FA5]+$/,
            message: "请输入正确字符，如字母数字中文",
            trigger: "blur"
          },
          {
            required: true,
            message: "必填",
            trigger: "blur"
          }
        ],
        pwd: [
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur"
          },
          {
            required: true,
            message: "必填",
            trigger: "blur"
          }
        ],
        phone: [
          {
            pattern: /(13\d|14[579]|15[^4\D]|17[^49\D]|18\d)\d{8}/,
            message: "请输入正确的手机号",
            trigger: "blur"
          },
          {
            min: 11,
            max: 11,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        email: [
          {
            pattern: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
            message: "请输入正确的邮箱",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getList();
    console.log("aaaaaaaaaa");
  },
  methods: {
    getList() {
      this.listLoading = true;
      postmanagerlist(this.listQuery).then(response => {
        this.listLoading = false;
        this.userlist = response.data;
        // this.total = data.total;
        // this.listQuery.page = data.pages;
      });
    },
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
      console.log(selection);
    },
    handleDelete(row) {
      // const deleteList = this.changeSelectDate(this.multipleSelection);
      // if (deleteList.length) {
        this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            // const deleteList = this.changeSelectDate(this.multipleSelection);
            postmanagerDelete({id:row.id}).then(() => {
              this.getList();
              // this.multipleSelection = [];
              this.$message({
                message: "删除成功",
                type: "success",
              });
            });
          })
          .catch(() => {
            console.log('--------------')
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      // }
    },
    changeSelectDate(data) {
      const arr = [];
      for (let i = 0; i < data.length; i++) {
        arr.push(data[i].id);
      }
      return arr;
    },

    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作Success",
        type: "success"
      });
      row.status = status;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    resetTemp() {
      this.user = {
        name: "", // 姓名
        username: "", // 用户名
        pwd: "", // 密码
        birthday: "", // 出生日期
        phone: "", // 手机号码
        mole: true, // 性别
        address: "", // 家庭住址
        email: "", // 邮箱
        id: "", // 用户id
        weiId: "",
        createdAt: "",
        roles: "admin"
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          console.log(this.user);
          postmanagerAdd(this.user).then((req) => {
            console.log(req)
            this.getList();
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    handleUpdate(row) {
      console.log(row);
      this.user = Object.assign({}, row); // copy obj
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      // this.user.birthday = parseTime(this.user.birthday, '{y}-{m}-{d}')
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          postmanagerChange(this.user).then(() => {
            this.getList();
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    handleCheck(row){
    },
    handleFetchPv(pv) {},
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    }
  }
};
</script>
