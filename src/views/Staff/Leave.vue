<template>
  <div>
    <el-table :data="items">
      <el-table-column prop="beginDateTime" label="开始时间" width="180"></el-table-column>
      <el-table-column prop="endDateTime" label="结束时间" width="180"></el-table-column>
      <el-table-column label="请假时长" width="180">
        <template slot-scope="scope">
          <span>{{ dutarion(scope.row) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="请假类型" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.type == 0 ? "病假" : "事假" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="180">
        <template slot-scope="scope">
          <span>{{ type_mapping[scope.row.status] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="submitStamp" label="提交时间" width="180"></el-table-column>
      <el-table-column prop="reviewerName" label="审批人" width="180"></el-table-column>
      <el-table-column prop="reviewStamp" label="审批时间" width="180"></el-table-column>
      <el-table-column prop="reportStamp" label="销假时间" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleCancle(scope.$index, scope.row)">取消</el-button>
        </template>
      </el-table-column>
    </el-table>

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
import { getLeavesByStaff, newLeave, modifyLeave } from "@/api/restful";

import { getCurrentID } from "@/utils/storage";

export default {
  async created() {
    await refreash();
  },
  data() {
    return {
      items: [],
      newitem: {},
      formLabelWidth: "120px"
    };
  },
  methods: {
    refreash: async function() {
      this.items = await getLeavesByStaff(getCurrentID());
    },
    clearItem: function() {
      this.newitem = {};
    },
    postItem: async function() {}
  }
};
</script>

<style>
</style>
