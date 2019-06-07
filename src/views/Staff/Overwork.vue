<template>
  <div>
    <el-table :data="items" v-loading="listLoading">
      <el-table-column prop="beginDate" label="加班日期" width="180"></el-table-column>
      <el-table-column prop="beginTime" label="开始时间" width="180"></el-table-column>
      <el-table-column prop="endTime" label="结束时间" width="180"></el-table-column>
      <el-table-column label="加班时长" width="180">
        <template slot-scope="scope">
          <span>{{ duration(scope.row) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <span>{{ status_mapping[scope.row.status] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提交时间" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.submitStamp | moment("from", "now") }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="reviewerName" label="审批人" width="180"></el-table-column>
      <el-table-column prop="reviewStamp" label="审批时间" width="180"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleCancel(scope.$index, scope.row)">取消</el-button>
        </template>
      </el-table-column>
    </el-table>

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
  deleteOvertime,
  getOvertimesByStaff,
  getOvertimeByDepartmentID
} from "@/api/restful";

import { getCurrentID } from "@/utils/storage";

export default {
  async created() {
    await this.refreash();
  },
  computed: {},
  data() {
    return {
      items: [],
      newitem: {},
      timeOptions: {
        start: "00:00",
        step: "00:30",
        end: "23:30"
      },
      status_mapping: ["未审批", "已通过", "未通过", "已过期"],

      formLabelWidth: "120px",
      listLoading: false
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.status == 2) {
        return "warning-row";
      } else if (row.status === 1) {
        return "success-row";
      }
      return "";
    },
    async refreash() {
      this.items = await getOvertimesByStaff(getCurrentID());
    },
    clearItem() {
      this.newitem = {};
    },
    async postItem() {
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
    },

    duration(overtime) {
      return 1;
    },

    async handleCancel(index, row) {
      await deleteOvertime(row.ID);
      await this.refreash();
    }
  }
};
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
