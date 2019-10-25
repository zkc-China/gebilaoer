<template>
  <div>
    <div class="steps_main">
      <el-steps :active="active">
        <el-step title="上传excel文件" icon="el-icon-upload"></el-step>
        <el-step title="筛选数据" icon="el-icon-edit"></el-step>
        <el-step title="完成导入" icon="el-icon-picture"></el-step>
      </el-steps>

      <el-upload
        v-show="active==0"
        class="upload-demo"
        drag
        accept=".xlsx, .xls"
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          把excl拖到这里 或者
          <em>浏览</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传.xlsx/.xls/.csv文件，且不超过5m</div>
      </el-upload>

      <div class="tab-container" v-show="active==1">
        <el-tag>mounted times ：{{ createdTimes }}</el-tag>
        <el-alert
          :closable="false"
          style="width:200px;display:inline-block;vertical-align: middle;margin-left:30px;"
          title="Tab with keep-alive"
          type="success"
        />
        <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
          <el-tab-pane
            v-for="item in tabMapOptions"
            :key="item.key"
            :label="item.label"
            :name="item.key"
          >
            <keep-alive>
              <tab-pane v-if="activeName==item.key" :type="item.key" @create="showCreatedTimes" />
            </keep-alive>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
    </div>
  </div>
</template>

<script>
import tabPane from "./components/TabPane";

export default {
  name: "Tab",
  components: { tabPane },
  data() {
    return {
      tabMapOptions: [
        { label: "合法的", key: "CN" },
        { label: "有问题的", key: "US" }
      ],
      activeName: "CN",
      createdTimes: 0,
      active: 0
    };
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`);
    }
  },
  created() {
    // init the default selected tab
    const tab = this.$route.query.tab;
    if (tab) {
      this.activeName = tab;
    }
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
      // this.$router.push('/aaa/index')
    },
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1;
    }
  }
};
</script>

<style scoped>
.tab-container {
  margin: 30px;
}
.steps_main {
  margin: 30px;
  padding: 30px;
}
.upload-demo{
  width: 360px;
  margin: 20px auto;
}
.el-upload__tip {
    text-align: center;
}
</style>
