<template>
  <div>
    <el-table></el-table>

    <el-form :model="newitem">
      <h3>新请假：</h3>
      <el-form-item label="假期时间" :label-width="formLabelWidth">
        <el-date-picker
          v-model="newitem.leaveTime"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          align="right"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="请假类型" :label-width="formLabelWidth">
        <el-radio-group v-model="newitem.type">
          <el-radio border label="病假"></el-radio>
          <el-radio border label="事假"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="请假原因" :label-width="formLabelWidth">
        <el-input type="textarea" :rows="2" placeholder="请假原因（100字以内）" v-model="newitem.reason"></el-input>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth">
        <el-button @click="clearItem">清空</el-button>
        <el-button type="primary" @click="postItem">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      newitem: {},
      formLabelWidth: "120px"
    };
  },
  methods: {
    refreash: () => {},
    clearItem: function() {
      this.newitem = {};
    },
    postItem: async function() {}
  }
};
</script>

<style>
</style>
