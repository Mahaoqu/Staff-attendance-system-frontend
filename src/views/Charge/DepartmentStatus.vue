<template>
  <div>
    <el-table
      :data="staffs"
      highlight-current-row
      @current-change="handleCurrentChange"
      v-loading="listLoading"
      style="width : 50%"
    >
      <el-table-column prop="ID" label="工号" width="50"/>
      <el-table-column prop="name" label="姓名" width="180"/>
      <el-table-column label="所属部门">
        <template slot-scope="scope">
          <span>{{ departmentMapping[scope.row.departmentID] || '-' }}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-calendar
      #dateCell="{date, data}"
      v-show="this.currentStaff != null"
      v-loading="calendarLoading"
      v-model="cvalue"
    >
      <span>{{ data.day.split('-')[2] }}</span>
      <br>
      <!-- {{status_map[data.day]}} -->
      <div v-for="s of status_map[data.day]" :key="s.index">
        <p v-if="s.type === 'leave'">请假：</p>
        <p v-else>
          {{type[s.type]}}
          <br>
          开始时间： {{s.beginTime}}
          <br>
          结束时间：{{s.endTime}}
          <br>
          上班打卡：{{new Date(parseInt(s.pbeginDateTime ) * 1000) || '未打卡'}}
          <br>
          下班打卡：{{new Date(parseInt(s.pendDateTime) * 1000) || '未打卡' }}
        </p>
      </div>
      <template v-if="true"></template>
      <div v-else></div>
    </el-calendar>
  </div>
</template>

<script>
import {
  getStaff,
  getStaffsByDepartment,
  getStatusByDate,
  getStatusByRange
} from "@/api/restful";

import { getCurrentID, departmentMapping } from "@/utils/storage";

export default {
  async created() {
    this.listLoading = true;
    await this.refreash();
    this.departmentMapping = await departmentMapping();
    this.listLoading = false;
  },
  data() {
    return {
      formLabelWidth: "100px",
      departmentMapping: {},
      type: { arrangement: "工作安排", overtime: "加班", leaves: "请假" },
      staffs: [],
      cvalue: new Date(),
      currentStaff: null,
      currentDate: null,
      currentArranges: null,
      listLoading: false,
      calendarLoading: false,
      current_status: null,
      status_map: {},
      newitem: {}
    };
  },
  computed: {},
  methods: {
    // arrange: async function(date) {
    //   console.log(date);
    //   status = await getStatusByDate(getCurrentID(), date);
    //   return status;
    // },
    refreash: async function(params) {
      this.listLoading = true;
      this.me = await getStaff(getCurrentID());
      this.staffs = await getStaffsByDepartment(this.me.departmentID);
      this.listLoading = false;
    },

    // 更改当前的安排表
    // 选择人物时调用
    handleCurrentChange: async function(val) {
      this.currentStaff = val;
      this.$nextTick(async function() {
        await this.getStatusByRange();
      });
    },
    getStatusByRange: async function() {
      const a = new Date(this.cvalue.toJSON());
      const b = new Date(this.cvalue.toJSON());
      a.setDate(1);
      b.setDate(30);
      this.status_map = await getStatusByRange(this.currentStaff.ID, [a, b]);
    }
  }
};
</script>

<style>
</style>
