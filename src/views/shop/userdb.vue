<template>
  <div class="app-container">
    <div class="filter-container">
      姓名：
      <el-input
        v-model="username"
        placeholder="请输入查找的姓名"
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
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="infolist"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      v-show="infolist"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="姓名" align="center" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
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
      <el-table-column label="家庭地址" width="220px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!infolist && person">
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card class="box-card aaaa">
            <div slot="header" class="clearfix">
              <span>姓名:{{person.name}}</span>
              <el-button style="float: right; padding: 3px 0" type="text">修改</el-button>
            </div>
            <div class="text item">手机号：{{person.phone}}</div>
            <div class="text item">家庭住址:{{person.address}}</div>
            <div class="text item">首次训练时间：{{person.createdAt | parseTime('{y}-{m}-{d} ') }}</div>
            <div class="text item">上次训练时间：{{person.createdAt | parseTime('{y}-{m}-{d} ') }}</div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card aaaa">
            <div slot="header" class="clearfix">
              <span>家族史</span>
              <el-button style="float: right; padding: 3px 0" type="text">修改</el-button>
            </div>
            <div class="text item">隔壁老二晚上去遛狗</div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card aaaa">
            <div slot="header" class="clearfix">
              <span>诉求</span>
              <el-button style="float: right; padding: 3px 0" type="text">修改</el-button>
            </div>
            <div class="text item">帅比想隔壁老二了</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div v-show="!infolist && person" style="margin-top:30px">
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card class="box-card aaaa">
            <div slot="header" class="clearfix">
              <span>屈光检查 2次 </span>
              <el-button style="float: right; padding: 3px 0" type="text">查看详细信息</el-button>
            </div>
            <div v-for="o in resutlist.refractive" :key="o.id" class="text item">
                {{o.date |  parseTime('{y}-{m}-{d} ') }}  ---------- {{o.waiter}}
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card aaaa">
            <div slot="header" class="clearfix">
              <span>视功能检查 3次</span>
              <el-button style="float: right; padding: 3px 0" type="text">查看详细信息</el-button>
            </div>
            <div v-for="o in resutlist.visual" :key="o.id" class="text item">
               {{o.date |  parseTime('{y}-{m}-{d} ') }}  ---------- {{o.waiter}}
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card aaaa">
            <div slot="header" class="clearfix">
              <span>训练记录 4次</span>
              <el-button style="float: right; padding: 3px 0" type="text">查看详细信息</el-button>
            </div>
            <div v-for="o in resutlist.train" :key="o.id" class="text item">
                {{o.date |  parseTime('{y}-{m}-{d} ') }}  ---------- {{o.waiter}}
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getrefracitiveinfo } from "@/api/refractive";
import { getraininfo } from "@/api/train";
import { getvisualinfo } from "@/api/visual";
import { getmanagerlist } from "@/api/person";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

export default {
  name: "userdb",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      username: "",
      infolist: null,
      person: "",
      tableKey: 0,
      listLoading: false, //loading效果图
      resutlist: {
        visual: "",
        train: "",
        refractive: ""
      }
    };
  },
  created() {},
  methods: {
    resetTemp() {
      this.username = "";
    },
    handleFilter() {
      this.listLoading = true;
      if (this.username) {
        getmanagerlist(this.username).then(reponse => {
          this.infolist = reponse.data;
          this.listLoading = false;
        });
      }
    },
    handleUpdate(person) {
      //查找这个人所有检查记录
      this.resetTemp();
      this.person = Object.assign({}, person);
      this.infolist = null;
      getrefracitiveinfo(person.id).then(response => {
        this.resutlist.refractive = response.data;
      });
      getraininfo(person.id).then(reponse => {
        this.resutlist.train = reponse.data;
      });
      
      getvisualinfo(person.id).then(response => {
        this.resutlist.visual = response.data;
      });
      console.log(this.resutlist);
    }
  }
};
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

/* .box-card {
    width: 480px;
  } */
.aaaa {
  height: 220px;
}
</style>
