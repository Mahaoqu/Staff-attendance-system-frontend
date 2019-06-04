<template>
  <div>
    <el-table></el-table>

    <el-form :model="newitem">
      <h3>新加班申请：</h3>
      <el-form-item label="加班日期" :label-width="formLabelWidth">
        <el-date-picker
          v-model="newitem.date"
          align="right"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          :picker-options="dateOptions"
        />
      </el-form-item>
      <el-form-item label="加班时间" :label-width="formLabelWidth">
        <el-time-select
          placeholder="起始时间"
          v-model="newitem.beginTime"
          :picker-options="{
            start: start_time,
            step: '00:30',
          }"
        ></el-time-select>
        <span>-</span>
        <el-time-select
          placeholder="结束时间"
          v-model="newitem.endTime"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30',
            minTime: startTime
          }"
        ></el-time-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {} from "@/api/restful";

export default {
  created() {
    this.newitem.date = new Date().toISOString().slice(0, 10);
  },
  computed: {
    start_time: function() {
      return 1
    }
  },
  data() {
    return {
      newitem: {},

      formLabelWidth: "120px",

      dateOptions: [
        {
          text: "今天",
          onClick(picker) {
            picker.$emit("pick", new Date());
          }
        },
        {
          text: "明天",
          onClick(picker) {
            picker.$emit("pick", new Date() + 3600 * 1000 * 24);
          }
        }
      ]
    };
  },
  methods: {}
};
</script>

<style>
</style>
