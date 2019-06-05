<template>
  <div>
    <el-table></el-table>

    <el-form :model="newitem">
      <h3>新加班申请：</h3>
      <p>只能申请本日（{{new Date().toLocaleDateString()}}）加班。</p>
      <el-form-item label="开始时间" :label-width="formLabelWidth">
        <el-time-select
          v-model="newitem.beginTime"
          placeholder="开始时间"
          :picker-options="timeOptions"
        ></el-time-select>
      </el-form-item>
      <el-form-item label="结束时间" :label-width="formLabelWidth">
        <el-time-select placeholder="结束时间" v-model="newitem.endTime" :picker-options="timeOptions"></el-time-select>
        <span>{{(newitem.beginTime > newitem.endTime)? "（次日）" :""}}</span>
      </el-form-item>
      <el-form-item label="加班原因" :label-width="formLabelWidth">
        <el-input type="textarea" :rows="2" placeholder="加班原因（100字以内）" v-model="newitem.reason"></el-input>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth">
        <el-button @click="clearItem">清空</el-button>
        <el-button type="primary" @click="postItem">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getOvertimes,
  getOvertime,
  newOvertime,
  modifyOvertime,
  getOvertimeByStaff,
  getOvertimeByDepartmentID
} from "@/api/restful";

import { getCurrentID } from "@/utils/storage";

export default {
  created() {},
  computed: {
    start_time: function() {
      return 1;
    }
  },
  data() {
    return {
      newitem: {},
      timeOptions: {
        start: "00:00",
        step: "00:30",
        end: "23:30"
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    refreash: () => {},
    clearItem: function() {
      this.newitem = {};
    },
    postItem: async function() {
      // 不发送 beginTime 而是 beginDateTime
      let o = { ...this.newitem };
      let [h, m] = o.beginTime.split(":").map(s => parseInt(s));
      let t = new Date();
      t.setMilliseconds(0);
      t.setSeconds(0);
      t.setMinutes(m);
      t.setHours(h);
      o.beginDateTime = t;
      delete o.beginTime;

      // 添加 员工ID (似乎没有必要)
      // o.staffID = getCurrentID();

      await newOvertime(o);

      this.$message({
        type: "success",
        message: "添加申请成功"
      });
      this.clearItem();
      await this.refreash();
    }
  }
};
</script>

<style>
</style>
