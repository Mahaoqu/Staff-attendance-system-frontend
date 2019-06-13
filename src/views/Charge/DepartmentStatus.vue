<template>
  <div>
    <el-table
      :data="staffs"
      highlight-current-row
      @current-change="handleCurrentChange"
      v-loading="listLoading"
      style="width : 30%"
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
    >
      <span>{{ data.day.split('-')[2] }}</span>
      <br>
      {{status_map[data.day]}}
      <template v-if="true"></template>
      <div v-else></div>
    </el-calendar>
  </div>
</template>

<script>
import {
  getStaff,
  getStaffsByDepartment,
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
      staffs: [],
      me: null,
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
      await this.getStatusByRange();
    },
    getArrangeByRange: async function() {
      console.log(nextThreeWeek);
      this.status_map = await getStatusByRange(
        this.currentStaff.ID,
        nextThreeWeek
      );
    }
  }
};
</script>

<style>
</style>
