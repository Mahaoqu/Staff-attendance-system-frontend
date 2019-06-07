<template>
  <div>
    <el-table :data="items">
      <el-table-column prop="beginDateTime" label="开始时间" width="100">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="scope.row.endDateTime.toLocaleString()"
            placement="top-start"
          >
            <span>{{ scope.row.beginDateTime | moment('calendar') }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="endDateTime" label="结束时间" width="100">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="scope.row.endDateTime.toLocaleString()"
            placement="top-start"
          >
            <span>{{ scope.row.endDateTime | moment('calendar') }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="请假时长" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.endDateTime - scope.row.beginDateTime | duration('humanize')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template slot-scope="scope">
          <span>{{ status_mapping[scope.row.status] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="请假类型" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.type == 0 ? "病假" : "事假" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="请假原因" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.reason }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="reviewerName" label="审批人" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.reviewerName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="submitStamp" label="提交时间" width="100">
        <template slot-scope="scope">
          <span>{{ fromNow(scope.row.submitStamp) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="reviewStamp" label="审批时间" width="100">
        <template slot-scope="scope">
          <span>{{ fromNow(scope.row.reviewStamp) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="reportStamp" label="销假时间" width="100">
        <template slot-scope="scope">
          <span>{{ fromNow(scope.row.reportStamp) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleReport(scope.$index, scope.row)"
            :disabled="scope.row.status != 1"
          >销假</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleCancel(scope.$index, scope.row)"
            :disabled="scope.row.status != 0"
          >取消</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-form :model="newitem">
      <h3>新请假：</h3>
      <el-form-item label="假期时间" :label-width="formLabelWidth">
        <el-date-picker
          v-model="newitem.leaveTime"
          :picker-options="pickerOptions"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :default-time="['9:00:00', '17:00:00']"
          align="right"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="假期时长" :label-width="formLabelWidth">{{ duration }}</el-form-item>
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
import {
  getLeavesByStaff,
  newLeave,
  modifyLeave,
  deleteLeave,
  reportLeave
} from "@/api/restful";

import { getCurrentID } from "@/utils/storage";

export default {
  async created() {
    await this.refreash();
  },
  computed: {
    duration() {
      if (this.newitem.leaveTime) {
        return this.$moment
          .duration(this.newitem.leaveTime[0] - this.newitem.leaveTime[1])
          .humanize();
      } else return "-";
    }
  },
  data() {
    let t = this;
    return {
      items: [],
      newitem: {},
      pickerOptions: {
        disabledDate: function(date) {
          return t
            .$moment(date)
            .add(1, "d")
            .isBefore(new Date());
        }
      },
      formLabelWidth: "120px",
      status_mapping: ["未审核", "主管已审核", "主管未批准", "已取消", "已销假"]
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
    fromNow(time) {
      console.log(time);
      if (time === undefined || time === null) {
        return "-";
      } else return this.$moment(time).fromNow();
    },
    refreash: async function() {
      this.items = await getLeavesByStaff(getCurrentID());
    },
    clearItem: function() {
      this.newitem = {};
    },
    postItem: async function() {
      // 将表单中的LeaveTime数组转换成分开的形式
      let l = { ...this.newitem };
      l.beginDateTime = l.leaveTime[0];
      l.endDateTime = l.leaveTime[1];
      delete l.leaveTime;

      await newLeave(l);
      this.$message({
        type: "success",
        message: "添加申请成功"
      });
      this.clearItem();
      await this.refreash();
    },
    async handleCancel(index, row) {
      await deleteLeave(row.ID);
      this.$message({
        type: "success",
        message: "取消成功"
      });
      await this.refreash();
    },
    async handleReport(index, row) {
      await reportLeave(row.ID);
      this.$message({
        type: "success",
        message: "销假成功"
      });
    }
  }
};
</script>

<style>
</style>
