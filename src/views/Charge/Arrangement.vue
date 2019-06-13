<template>
  <div>
    <el-table
      :data="staffs"
      highlight-current-row
      @current-change="handleCurrentChange"
      v-loading="listLoading"
      style="width : 40%"
    >
      <el-table-column prop="ID" label="工号" width="50"/>
      <el-table-column prop="name" label="姓名" width="180"/>
      <el-table-column label="所属部门">
        <template slot-scope="scope">
          <span>{{ departmentMapping[scope.row.departmentID] || '-' }}</span>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <el-button round type="danger">设置为996</el-button>
    <el-button round type="primary">设置为955</el-button>
    <br>
    <el-calendar
      #dateCell="{date, data}"
      :range="range"
      v-show="this.currentStaff != null"
      v-loading="calendarLoading"
    >
      <span>{{ data.day.split('-')[2] }}</span>
      <br>
      <template v-if="arrangment_map[data.day] == undefined">
        <div>暂无工作安排</div>
        <el-button @click="changeArrange(date)" size="mini" round type="primary">新工作安排</el-button>
      </template>
      <div v-else>
        <div v-for="a in arrangment_map[data.day]" :key="a.ID">
          <small>工作时间：{{a.beginTime}} - {{a.endTime}}</small>
        </div>
        <el-button @click="changeArrange(date)" size="mini" round type="info">修改安排</el-button>
      </div>
    </el-calendar>

    <el-dialog title="工作安排" :visible.sync="changeVisible" width="50%">
      <el-table :data="currentArranges">
        <el-table-column prop="beginTime" label="开始时间" width="100"></el-table-column>
        <el-table-column prop="endTime" label="结束时间" width="100"></el-table-column>
        <el-table-column prop="content" label="工作内容"></el-table-column>
        <el-table-column label="操作" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleCancel(scope.$index, scope.row)">取消</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <el-form :model="newitem">
        <el-form-item label="工作时间" :label-width="formLabelWidth">
          <el-time-select
            placeholder="起始时间"
            v-model="newitem.beginTime"
            :picker-options="{
              start: '00:00',
              step: '00:15',
              end: '23:45'
            }"
          ></el-time-select>
          <span>至</span>
          <el-time-select
            placeholder="结束时间"
            v-model="newitem.endTime"
            :picker-options="{
              start: '00:15',
              step: '00:15',
              end: '24:00',
              minTime: newitem.beginTime
            }"
          ></el-time-select>
        </el-form-item>

        <el-form-item label="工作内容" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" placeholder="工作内容（100字以内）" v-model="newitem.content"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-button @click="clearItem">清空</el-button>
          <el-button type="primary" @click="postItem">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getArrangementsByRange,
  getArrangementsByIDandDate,
  getStaff,
  getStaffsByDepartment,
  newArrangement,
  modifyArrangement,
  deleteArrangement
} from "@/api/restful";

import { getCurrentID, departmentMapping } from "@/utils/storage";

// 表示日历的范围。为上一个周一开始的三周之内。
const nextThreeWeek = [
  lastMonday(new Date()),
  threeWeeksLater(lastMonday(new Date()))
];

function lastMonday(day) {
  day.setDate(day.getDate() - day.getDay() + 1);
  return day;
}

function threeWeeksLater(day) {
  day.setDate(day.getDate() + 20);
  return day;
}

export default {
  async created() {
    this.arrangment_map = {};
    await this.refreash();
    this.departmentMapping = await departmentMapping();
  },
  data() {
    return {
      formLabelWidth: "100px",
      range: nextThreeWeek,
      departmentMapping: {},
      staffs: [],
      me: null,
      currentStaff: null,
      currentDate: null,
      currentArranges: null,
      listLoading: false,
      calendarLoading: false,
      current_arrangement: null,
      changeVisible: false,
      arrangment_map: {},
      newitem: {}
    };
  },
  computed: {},
  methods: {
    // 加载人物表
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
      await this.getArrangeByRange();
    },

    // 根据当前任务刷新安排表
    getArrangeByRange: async function() {
      console.log(nextThreeWeek);
      this.arrangment_map = await getArrangementsByRange(
        this.currentStaff.ID,
        nextThreeWeek
      );
    },

    // --------------
    // 弹出的对话框内容：
    // --------------
    changeArrange: async function(date) {
      this.currentDate = date.toISOString().slice(0, 10);
      this.currentArranges = this.arrangment_map[this.currentDate];
      this.changeVisible = true;
    },

    // 刷新某天的安排
    refreashItem: async function(staffID, date) {
      this.currentArranges = await getArrangementsByIDandDate(staffID, date);
      await this.getArrangeByRange();
    },

    // 清除新建项
    clearItem: function() {
      this.newitem = {};
    },

    // 在某天的安排中增加一项
    postItem: async function() {
      // 将表单中的LeaveTime数组转换成分开的形式
      let a = { ...this.newitem };
      a.staffID = this.currentStaff.ID;
      a.date = this.currentDate;

      await newArrangement(a);
      this.$message({
        type: "success",
        message: "添加安排成功"
      });

      this.clearItem();
      await this.refreashItem(this.currentStaff.ID, this.currentDate);
    },

    // 在某天的安排中取消一项
    async handleCancel(index, row) {
      await deleteArrangement(row.ID);
      this.$message({
        type: "success",
        message: "取消成功"
      });
      await this.refreashItem(this.currentStaff.ID, this.currentDate);
    }
  }
};
</script>

<style>
</style>
