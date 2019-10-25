<template>
  <div class="app-container">
    <div class="filter-container">
      被保险人姓名：
      <el-input
        placeholder
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />被保险人身份证号码：
      <el-input
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />保险公司保单号：
      <el-input
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
    </div>
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
     
      checkinfo: {
        name: "", //被保险人姓名
        idcard: "", //被保险人身份证号码
        startTime: "", //开始时间
        endTime: "", //结束时间
        number: "" //保单号
      },
      dialogStatus: "", // 创建还是修改
      tableKey: 0,
      listLoading: true, // loading状态
      total: 0,
      dialogFormVisible: false,
    };
  },
  created() {
    console.log("aaaaaaaaaa");
  },
  methods: {
    handleFilter(){

    }
  }
};
</script>
