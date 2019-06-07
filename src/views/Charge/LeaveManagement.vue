<template>
  <el-table :data="items" v-loading="listLoading" :row-class-name="tableRowClassName">
    <el-table-column prop="staffName" label="请假人"></el-table-column>
    <el-table-column prop="beginDateTime" label="开始时间" width="180">
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
    <el-table-column prop="endDateTime" label="结束时间" width="180">
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
    <el-table-column label="假期时长">
      <template slot-scope="scope">
        <span>{{ scope.row.endDateTime - scope.row.beginDateTime | duration('humanize')}}</span>
      </template>
    </el-table-column>
    <el-table-column label="原因" width="180">
      <template slot-scope="scope">
        <span>{{ scope.row.reason }}</span>
      </template>
    </el-table-column>
    <el-table-column label="状态">
      <template slot-scope="scope">
        <span>{{ status_mapping[scope.row.status] }}</span>
      </template>
    </el-table-column>
    <el-table-column label="提交时间">
      <template slot-scope="scope">
        <span>{{ fromNow(scope.row.submitStamp) }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="reviewerName" label="审批人" width="180"></el-table-column>
    <el-table-column label="审批时间" width="180">
      <template slot-scope="scope">
        <span>{{ fromNow(scope.row.reviewStamp) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="销假时间" width="180">
      <template slot-scope="scope">
        <span>{{ fromNow(scope.row.reportStamp) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" fixed="right" width="150">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="info"
          @click="handlePermit(scope.$index, scope.row)"
          :disabled="scope.row.status != 0"
        >同意</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleReject(scope.$index, scope.row)"
          :disabled="scope.row.status != 0"
        >拒绝</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {
  getLeavesByCharge,
  newLeave,
  modifyLeave,
  permitLeave,
  rejectLeave
} from "@/api/restful";

import { getCurrentID } from "@/utils/storage";

export default {
  async created() {
    await this.refreash();
  },
  data() {
    return {
      items: [],
      listLoading: false,
      status_mapping: ["未审核", "已批准", "已拒绝", "已取消", "已销假"]
    };
  },
  computed: {},
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
    async refreash() {
      this.items = await getLeavesByCharge(getCurrentID());
    },
    async handlePermit(index, row) {
      await permitLeave(row.ID);
      this.$message({
        type: "success",
        message: "批准成功"
      });
      await this.refreash();
    },
    async handleReject(index, row) {
      await rejectLeave(row.ID);
      this.$message({
        type: "success",
        message: "拒绝成功"
      });
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
